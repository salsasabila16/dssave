import rateLimit from "express-rate-limit";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { spawn, execFileSync } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";
import {
  mkdirSync,
  existsSync,
  rmSync,
  readFileSync,
} from "fs";
import { tmpdir } from "os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const IS_PROD = process.env.NODE_ENV === "production";
const PORT    = parseInt(process.env.PORT ?? "3001");

// Cegah prototype pollution via query string
app.set("query parser", "simple");
// Jangan bocorkan info Express
app.disable("x-powered-by");
// Trust proxy untuk rate limiting yang benar di balik nginx/Caddy
if (IS_PROD) app.set("trust proxy", 1);

// ── Rate limiter terpisah per endpoint ────────────────────────────
const limiterInfo = rateLimit({
  windowMs: 60_000,         // 1 menit
  max: IS_PROD ? 10 : 60,  // 10/menit di prod, lebih longgar di dev
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Terlalu banyak permintaan. Coba lagi beberapa menit." },
});

const limiterDownload = rateLimit({
  windowMs: 60_000,
  max: IS_PROD ? 3 : 20,   // 3/menit di prod
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Terlalu banyak permintaan. Coba lagi beberapa menit." },
});

const NODE_PATH = process.execPath;
const FFMPEG_PATH = (() => {
  if (process.env.FFMPEG_PATH) return process.env.FFMPEG_PATH;
  const candidates = [
    "/opt/homebrew/bin/ffmpeg",
    "/usr/local/bin/ffmpeg",
    "/usr/bin/ffmpeg",
    "ffmpeg",
  ];
  for (const p of candidates) {
    try { execFileSync(p, ["-version"], { stdio: "ignore" }); return p; } catch { /* lanjut */ }
  }
  return "ffmpeg";
})();
const COOKIES_FILE = join(__dirname, "cookies.txt");

// SSL certificates untuk Python di macOS
const SSL_CERT_FILE = (() => {
  try {
    return execFileSync("python3", ["-c", "import certifi; print(certifi.where())"], { encoding: "utf8" }).trim();
  } catch {
    return process.env.SSL_CERT_FILE ?? "";
  }
})();
const PYTHON_ENV = SSL_CERT_FILE ? { ...process.env, SSL_CERT_FILE } : process.env;

// ── Cookie flags — dibaca sekali saat startup ──────────────────────
const COOKIE_FLAGS: string[] = (() => {
  if (!existsSync(COOKIES_FILE)) return [];
  const content = readFileSync(COOKIES_FILE, "utf8");
  const hasReal = content.split("\n").some((l) => l.trim() && !l.startsWith("#"));
  if (hasReal) {
    console.log("[cookies] menggunakan cookies.txt");
    return ["--cookies", COOKIES_FILE];
  }
  return [];
})();

// ── Concurrent download limit ──────────────────────────────────────
const MAX_CONCURRENT = IS_PROD ? 5 : 20;
let activeDownloads  = 0;

// ── Base flags yt-dlp ─────────────────────────────────────────────
function getBaseFlags(url: string): string[] {
  const flags = [
    "-m", "yt_dlp",
    "--no-playlist",
    "--no-warnings",
    "--geo-bypass",
    "--retries", "3",
    "--socket-timeout", "30",
    "--js-runtimes", `node:${NODE_PATH}`,
    "--ffmpeg-location", FFMPEG_PATH,
    "--add-header", "Accept-Language:id-ID,id;q=0.9,en-US;q=0.8",
    "--user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    ...COOKIE_FLAGS,
  ];

  if (url.includes("tiktok.com") || url.includes("vm.tiktok"))
    flags.push("--extractor-args", "tiktok:api_hostname=api16-normal-c-useast1a.tiktokv.com");
  if (url.includes("instagram.com"))
    flags.push("--extractor-args", "instagram:api_reels=1");

  return flags;
}

const FORMAT_MAP: Record<string, { fmt: string; ext: string; audio: boolean }> = {
  "MP4 360p": {
    fmt: "bestvideo[height<=360][vcodec^=avc1]+bestaudio[acodec^=mp4a]/bestvideo[height<=360][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=360]+bestaudio/18/best[height<=360][ext=mp4]/best[height<=360]",
    ext: "mp4", audio: false,
  },
  "MP4 720p": {
    fmt: "bestvideo[height<=720][vcodec^=avc1]+bestaudio[acodec^=mp4a]/bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=720]+bestaudio/22/best[height<=720][ext=mp4]/best[height<=720]",
    ext: "mp4", audio: false,
  },
  "MP4 1080p": {
    fmt: "bestvideo[height<=1080][vcodec^=avc1]+bestaudio[acodec^=mp4a]/bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=1080]+bestaudio/37/best[height<=1080][ext=mp4]/best[height<=1080]/best",
    ext: "mp4", audio: false,
  },
  "MP3 Audio": { fmt: "bestaudio[ext=m4a]/140/bestaudio/best", ext: "mp3", audio: true },
  "WAV Audio": { fmt: "bestaudio[ext=m4a]/140/bestaudio/best", ext: "wav", audio: true },
};

// ── Helpers ────────────────────────────────────────────────────────
function detectPlatform(url: string): string {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "YouTube";
  if (url.includes("tiktok.com")  || url.includes("vm.tiktok")) return "TikTok";
  if (url.includes("instagram.com")) return "Instagram";
  if (url.includes("facebook.com") || url.includes("fb.watch")) return "Facebook";
  if (url.includes("twitter.com")  || url.includes("x.com"))   return "X (Twitter)";
  if (url.includes("pinterest.com") || url.includes("pin.it")) return "Pinterest";
  return "Unknown";
}

function isAllowedUrl(url: string): boolean {
  try {
    const { hostname, protocol } = new URL(url);
    if (protocol !== "https:" && protocol !== "http:") return false;
    return [
      "youtube.com", "www.youtube.com", "youtu.be",
      "instagram.com", "www.instagram.com",
      "tiktok.com", "www.tiktok.com", "vm.tiktok.com",
      "facebook.com", "www.facebook.com", "fb.watch",
      "x.com", "twitter.com", "www.twitter.com",
      "pinterest.com", "www.pinterest.com", "pin.it",
    ].includes(hostname);
  } catch { return false; }
}

function parseError(errOut: string, platform: string): string {
  if (errOut.includes("not available") || errOut.includes("unavailable"))
    return `Video tidak tersedia di ${platform} (privat, dihapus, atau dibatasi wilayah)`;
  if (errOut.includes("login") || errOut.includes("sign in") || errOut.includes("authentication"))
    return `${platform} membutuhkan autentikasi`;
  if (errOut.includes("rate") || errOut.includes("too many"))
    return `Terlalu banyak permintaan ke ${platform}. Coba lagi beberapa detik`;
  if (errOut.includes("private"))
    return `Konten ${platform} ini bersifat privat`;
  if (errOut.includes("copyright") || errOut.includes("blocked"))
    return `Video diblokir karena hak cipta di wilayah ini`;
  return `Gagal memproses URL dari ${platform}. Pastikan URL benar dan video publik`;
}

const AUDIO_MIME: Record<string, string> = {
  mp3: "audio/mpeg",
  wav: "audio/wav",
  ogg: "audio/ogg",
  m4a: "audio/mp4",
};

const MAX_ERR       = 100 * 1024;
const MAX_JSON      = 5 * 1024 * 1024;
const TIMEOUT_INFO  = 60_000;
const TIMEOUT_AUDIO = 5 * 60_000;
const TIMEOUT_VIDEO = 10 * 60_000;

function killAfter(proc: ReturnType<typeof spawn>, ms: number) {
  const t = setTimeout(() => { try { proc.kill("SIGTERM"); } catch { /* ok */ } }, ms);
  proc.on("close", () => clearTimeout(t));
}

function cleanDir(dir: string) {
  try { rmSync(dir, { recursive: true, force: true }); } catch { /* ok */ }
}

// ── Middleware ─────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc:  ["'self'"],
      scriptSrc:   ["'self'"],
      styleSrc:    ["'self'", "'unsafe-inline'"],
      imgSrc:      ["'self'", "data:", "https:"],
      connectSrc:  ["'self'"],
      fontSrc:     ["'self'", "https://fonts.gstatic.com"],
      objectSrc:   ["'none'"],
      frameAncestors: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false, // agar thumbnail external bisa dimuat
}));
app.use(cors({
  origin: IS_PROD
    ? ["https://dssave.com", "https://www.dssave.com"]
    : ["http://localhost:5173", "https://dssave.com", "https://www.dssave.com"],
}));
app.use(express.json({ limit: "1kb" }));

// ── GET /api/info ──────────────────────────────────────────────────
app.get("/api/info", limiterInfo, (req, res) => {
  const url = ((req.query.url as string) ?? "").trim();
  if (!url) return void res.status(400).json({ error: "URL diperlukan" });
  if (url.length > 2048) return void res.status(400).json({ error: "URL terlalu panjang" });
  if (!isAllowedUrl(url)) return void res.status(400).json({ error: "URL tidak didukung" });

  const platform = detectPlatform(url);
  // Log hanya domain, bukan full URL (hindari token/session di log)
  console.log(`[info] ${platform} → ${new URL(url).hostname}`);

  const proc = spawn("python3", [...getBaseFlags(url), "--dump-json", url], { env: PYTHON_ENV });
  killAfter(proc, TIMEOUT_INFO);

  let json = "";
  let errOut = "";
  proc.stdout.on("data", (d) => { if (json.length   < MAX_JSON) json   += d.toString(); });
  proc.stderr.on("data", (d) => { if (errOut.length < MAX_ERR)  errOut += d.toString(); });
  proc.on("error", () => {
    if (!res.headersSent) res.status(500).json({ error: "Gagal menjalankan downloader" });
  });
  req.on("close", () => { try { proc.kill("SIGTERM"); } catch { /* ok */ } });

  proc.on("close", (code) => {
    if (code !== 0) {
      console.error(`[info error] ${platform}:`, errOut.slice(-200));
      return void res.status(400).json({ error: parseError(errOut, platform), platform });
    }
    try {
      const info = JSON.parse(json.trim().split("\n")[0]);
      res.json({
        title:     info.title    ?? "Video",
        thumbnail: info.thumbnail ?? null,
        duration:  info.duration  ?? 0,
        uploader:  info.uploader  ?? info.channel ?? "",
        platform,
      });
    } catch {
      res.status(500).json({ error: "Gagal membaca info video" });
    }
  });
});

// ── GET /api/download ──────────────────────────────────────────────
app.get("/api/download", limiterDownload, (req, res) => {
  const url = ((req.query.url as string) ?? "").trim();
  if (!url)             return void res.status(400).json({ error: "URL diperlukan" });
  if (url.length > 2048) return void res.status(400).json({ error: "URL terlalu panjang" });
  if (!isAllowedUrl(url)) return void res.status(400).json({ error: "URL tidak didukung" });

  // Concurrent limit
  if (activeDownloads >= MAX_CONCURRENT)
    return void res.status(503).json({ error: "Server sedang sibuk. Coba lagi sebentar." });

  const platform  = detectPlatform(url);
  const rawFormat = (req.query.format as string) ?? "";
  if (rawFormat.length > 50) return void res.status(400).json({ error: "Format tidak valid" });
  const format = rawFormat || "MP4 720p";
  const cfg    = FORMAT_MAP[format] ?? FORMAT_MAP["MP4 720p"];
  console.log(`[download] ${platform} | ${format} → ${new URL(url).hostname}`);

  activeDownloads++;
  const done = () => { activeDownloads = Math.max(0, activeDownloads - 1); };

  // ── Audio ─────────────────────────────────────────────────────
  if (cfg.audio) {
    const tmpDir   = join(tmpdir(), "dssave", randomUUID());
    mkdirSync(tmpDir, { recursive: true });
    const audioFile = join(tmpDir, `audio.${cfg.ext}`);

    const proc = spawn("python3", [
      ...getBaseFlags(url),
      "-x", "--audio-format", cfg.ext, "--audio-quality", "0",
      "-o", audioFile, url,
    ], { env: PYTHON_ENV });
    killAfter(proc, TIMEOUT_AUDIO);

    let errOut = "";
    proc.stderr.on("data", (d) => { if (errOut.length < MAX_ERR) errOut += d.toString(); });
    proc.on("error", () => {
      done(); cleanDir(tmpDir);
      if (!res.headersSent) res.status(500).json({ error: "Gagal menjalankan downloader" });
    });
    req.on("close", () => { try { proc.kill("SIGTERM"); } catch { /* ok */ } });

    proc.on("close", (code) => {
      if (code !== 0) {
        console.error(`[audio error] ${platform}:`, errOut.slice(-200));
        done(); cleanDir(tmpDir);
        return void (res.headersSent || res.status(500).json({ error: parseError(errOut, platform) }));
      }
      if (!existsSync(audioFile)) {
        done(); cleanDir(tmpDir);
        return void res.status(500).json({ error: "File audio tidak ditemukan" });
      }
      res.setHeader("Content-Disposition", `attachment; filename="dssave_audio.${cfg.ext}"`);
      res.setHeader("Content-Type", AUDIO_MIME[cfg.ext] ?? "audio/mpeg");
      res.sendFile(audioFile, { root: "/" }, () => { done(); cleanDir(tmpDir); });
    });
    return;
  }

  // ── Video ─────────────────────────────────────────────────────
  const videoDir  = join(tmpdir(), "dssave", randomUUID());
  mkdirSync(videoDir, { recursive: true });
  const videoFile = join(videoDir, "video.mp4");

  const proc = spawn("python3", [
    ...getBaseFlags(url),
    "-f", cfg.fmt,
    "--merge-output-format", "mp4",
    "--postprocessor-args", "ffmpeg:-c:v copy -c:a aac -movflags +faststart",
    "-o", videoFile, url,
  ], { env: PYTHON_ENV });
  killAfter(proc, TIMEOUT_VIDEO);

  let errOutV = "";
  proc.stderr.on("data", (d) => {
    const msg = d.toString().trim();
    if (msg && !msg.startsWith("WARNING")) {
      console.error("[yt-dlp]", msg);
      if (errOutV.length < MAX_ERR) errOutV += d.toString();
    }
  });
  proc.on("error", (err) => {
    console.error("[spawn error]", err);
    done(); cleanDir(videoDir);
    if (!res.headersSent) res.status(500).json({ error: "Gagal menjalankan downloader" });
  });
  req.on("close", () => { try { proc.kill("SIGTERM"); } catch { /* ok */ } });

  proc.on("close", (code) => {
    if (code !== 0) {
      done(); cleanDir(videoDir);
      return void (res.headersSent || res.status(500).json({ error: parseError(errOutV, platform) }));
    }
    if (!existsSync(videoFile)) {
      done(); cleanDir(videoDir);
      return void res.status(500).json({ error: "File video tidak ditemukan" });
    }
    console.log(`[download done] ${platform}`);
    res.setHeader("Content-Disposition", 'attachment; filename="dssave_video.mp4"');
    res.setHeader("Content-Type", "video/mp4");
    res.sendFile(videoFile, { root: "/" }, () => { done(); cleanDir(videoDir); });
  });
});

// ── GET /api/platforms ─────────────────────────────────────────────
app.get("/api/platforms", (_req, res) => {
  res.json({
    platforms: ["YouTube", "TikTok", "Instagram", "Facebook", "X (Twitter)", "Pinterest"],
  });
});

// ── Serve frontend static files (production) ───────────────────────
if (IS_PROD) {
  const distPath = join(__dirname, "../../dist");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`\n✅ DSSAVE server → http://localhost:${PORT} [${IS_PROD ? "production" : "development"}]`);
  console.log(`   ffmpeg : ${FFMPEG_PATH}`);
  console.log(`   cookies: ${COOKIE_FLAGS.length > 0 ? "✅ ada" : "⚠️  tidak ada (opsional)"}`);
  console.log(`   concurrent: maks ${MAX_CONCURRENT} download`);
  console.log(`   Platform: YouTube ✓ TikTok ✓ Instagram ✓ Facebook ✓ X ✓ Pinterest ✓\n`);
});
