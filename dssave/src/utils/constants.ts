export const PLATFORMS = [
  {
    name: 'YouTube',
    iconKey: 'FaYoutube',
    color: '#FF0000',
    steps: [
      { title: 'Open YouTube', desc: 'Go to YouTube.com or open the YouTube app on your device.' },
      { title: 'Find your video', desc: 'Search for and open the video you want to download.' },
      { title: 'Copy the URL', desc: 'Copy the video URL from the address bar or use the Share button.' },
      { title: 'Paste into DSSAVE', desc: 'Paste the URL into the input field on DSSAVE.' },
      { title: 'Choose & Download', desc: 'Select your format (MP4 HD, 1080p, MP3) and click Download.' },
    ],
  },
  {
    name: 'TikTok',
    iconKey: 'SiTiktok',
    color: '#010101',
    steps: [
      { title: 'Open TikTok', desc: 'Open the TikTok app or visit TikTok.com.' },
      { title: 'Find the video', desc: 'Browse or search for the TikTok video you want to save.' },
      { title: 'Copy the link', desc: 'Tap Share → Copy Link to get the video URL.' },
      { title: 'Paste into DSSAVE', desc: 'Paste the TikTok URL into the DSSAVE input field.' },
      { title: 'Download without watermark', desc: 'Select MP4 and download — no TikTok watermark.' },
    ],
  },
  {
    name: 'Instagram',
    iconKey: 'FaInstagram',
    color: '#E1306C',
    steps: [
      { title: 'Open Instagram', desc: 'Open the Instagram app or go to Instagram.com.' },
      { title: 'Find the post', desc: 'Navigate to the Reel, post, or Story you want to download.' },
      { title: 'Copy the link', desc: 'Tap the three-dot menu → Copy Link.' },
      { title: 'Paste into DSSAVE', desc: 'Paste the Instagram URL into the DSSAVE input field.' },
      { title: 'Download your content', desc: 'Choose the format and hit Download to save it.' },
    ],
  },
  {
    name: 'Facebook',
    iconKey: 'FaFacebookF',
    color: '#1877F2',
    steps: [
      { title: 'Open Facebook', desc: 'Open the Facebook app or visit Facebook.com.' },
      { title: 'Find the video', desc: 'Navigate to the video post you want to save.' },
      { title: 'Copy the link', desc: 'Click Share → Copy Link to get the video URL.' },
      { title: 'Paste into DSSAVE', desc: 'Paste the Facebook video URL into DSSAVE.' },
      { title: 'Download in HD', desc: 'Select your preferred quality and download instantly.' },
    ],
  },
  {
    name: 'X (Twitter)',
    iconKey: 'FaXTwitter',
    color: '#000000',
    steps: [
      { title: 'Open X', desc: 'Open the X (formerly Twitter) app or visit X.com.' },
      { title: 'Find the tweet', desc: 'Locate the tweet containing the video you want.' },
      { title: 'Copy the link', desc: 'Click Share → Copy Link to this Post.' },
      { title: 'Paste into DSSAVE', desc: 'Paste the tweet URL into the DSSAVE input.' },
      { title: 'Save the video', desc: 'Pick your format and download the video.' },
    ],
  },
  {
    name: 'Pinterest',
    iconKey: 'SiPinterest',
    color: '#E60023',
    steps: [
      { title: 'Open Pinterest', desc: 'Open the Pinterest app or visit Pinterest.com.' },
      { title: 'Find the Pin', desc: 'Browse and open the video Pin you want to download.' },
      { title: 'Copy the link', desc: 'Tap Share → Copy Link to get the Pin URL.' },
      { title: 'Paste into DSSAVE', desc: 'Paste the Pinterest URL into the DSSAVE input.' },
      { title: 'Download the video', desc: 'Choose your format and click Download.' },
    ],
  },
] as const

export const PAIN_POINTS = [
  {
    title: 'Watermarked Downloads',
    desc: 'Most downloaders add ugly watermarks that ruin your content.',
    icon: 'FiAlertOctagon',
    color: '#FF6B6B',
  },
  {
    title: 'Agonizingly Slow',
    desc: 'Overloaded servers that take minutes just to process a short clip.',
    icon: 'FiClock',
    color: '#FFB347',
  },
  {
    title: 'Terrible Quality',
    desc: 'Compressed, pixelated files that look nothing like the original.',
    icon: 'FiEyeOff',
    color: '#A78BFA',
  },
  {
    title: 'Unsafe Websites',
    desc: 'Sketchy downloaders loaded with malware, trackers, and phishing.',
    icon: 'FiShield',
    color: '#F87171',
  },
  {
    title: 'Ad Overload',
    desc: 'Endless pop-ups, redirects, and fake download buttons.',
    icon: 'FiZapOff',
    color: '#FBBF24',
  },
  {
    title: 'Limited Platforms',
    desc: 'Tools that only work for one or two platforms, forcing you to use multiple apps.',
    icon: 'FiGrid',
    color: '#60A5FA',
  },
] as const

export const UNIQUENESS_CARDS = [
  {
    title: 'Multi-Platform Downloader',
    desc: 'Download from YouTube, TikTok, Instagram, Facebook, X, and Pinterest — all in one place.',
    icon: 'FiLayers',
  },
  {
    title: 'Full HD Quality',
    desc: 'Download in 360p, 720p HD, or 1080p Full HD — your choice, your quality.',
    icon: 'FiMonitor',
  },
  {
    title: 'Lightning Fast',
    desc: 'Optimized infrastructure processes your download in seconds, not minutes.',
    icon: 'FiZap',
  },
  {
    title: 'No Registration',
    desc: 'Zero sign-ups, zero accounts. Paste a URL and you\'re done. That\'s it.',
    icon: 'FiUserX',
  },
  {
    title: 'Mobile Friendly',
    desc: 'Works perfectly on any device — iPhone, Android, tablet, or desktop.',
    icon: 'FiSmartphone',
  },
  {
    title: 'Secure & Private',
    desc: 'No user data stored. No tracking. Your downloads stay completely private.',
    icon: 'FiLock',
  },
] as const

export const FEATURES = [
  { title: 'HD Downloads', icon: 'FiMonitor', desc: 'Up to 1080p Full HD' },
  { title: 'MP3 Conversion', icon: 'FiMusic', desc: 'Extract audio instantly' },
  { title: 'Multi-Platform', icon: 'FiGlobe', desc: '6 major platforms' },
  { title: 'Lightning Speed', icon: 'FiZap', desc: 'Seconds, not minutes' },
  { title: 'Unlimited Use', icon: 'FiRepeat', desc: 'No daily caps' },
  { title: 'No Watermark', icon: 'FiCheckCircle', desc: 'Clean, pure files' },
  { title: 'Safe & Secure', icon: 'FiShield', desc: 'Zero malware risk' },
  { title: 'Mobile Ready', icon: 'FiSmartphone', desc: 'Works on any device' },
  { title: 'Cloud Processing', icon: 'FiCloud', desc: 'Fast remote servers' },
  { title: 'Modern UI', icon: 'FiStar', desc: 'Built for everyone' },
] as const

export const STATS = [
  { label: 'Downloads Served', value: 500000, suffix: '+', display: '500K+' },
  { label: 'Active Users', value: 50000, suffix: '+', display: '50K+' },
  { label: 'Uptime', value: 99.9, suffix: '%', display: '99.9%', isFloat: true },
  { label: 'Platforms Supported', value: 6, suffix: '', display: '6' },
] as const

export const FAQS = [
  {
    q: 'Is DSSAVE completely free?',
    a: 'Yes, DSSAVE is 100% free to use. There are no hidden fees, subscriptions, or paywalls. Just paste your URL and download.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No account needed. DSSAVE works instantly — just visit the site, paste your video URL, and start downloading.',
  },
  {
    q: 'Is DSSAVE safe to use?',
    a: 'Absolutely. DSSAVE does not store any user data, doesn\'t require personal information, and our servers are regularly scanned for security vulnerabilities.',
  },
  {
    q: 'Can I use DSSAVE on my mobile phone?',
    a: 'Yes! DSSAVE is fully responsive and works seamlessly on iOS and Android. You can also install it as a PWA for an app-like experience.',
  },
  {
    q: 'Does DSSAVE support HD video downloads?',
    a: 'Yes. DSSAVE supports downloads in 360p, 720p HD, and 1080p Full HD, depending on the original video quality and the source platform.',
  },
  {
    q: 'Why are some videos unavailable for download?',
    a: 'Private videos, region-locked content, or content removed by the platform cannot be downloaded. Public videos from supported platforms work fully.',
  },
  {
    q: 'Is there a download limit?',
    a: 'No, there is no daily or monthly download cap. You can download as many videos as you need without restrictions.',
  },
  {
    q: 'Can I install DSSAVE as an app on my phone?',
    a: 'Yes! DSSAVE is a Progressive Web App (PWA). You can install it on Android, iOS, Windows, and macOS directly from your browser — no app store needed.',
  },
] as const

export const TESTIMONIALS = [
  {
    name: 'Alex Rivera',
    handle: '@alexcreates',
    text: 'DSSAVE is the only downloader I\'ve found that actually works without watermarks on TikTok. Game changer for my content workflow.',
    rating: 5,
    color: '#2D9CDB',
    initials: 'AR',
  },
  {
    name: 'Priya Sharma',
    handle: '@priyaedits',
    text: 'I tried 10 different downloaders before finding DSSAVE. It\'s the only one that consistently delivers 1080p quality from Instagram.',
    rating: 5,
    color: '#0B8FFF',
    initials: 'PS',
  },
  {
    name: 'Marcus Chen',
    handle: '@marcustech',
    text: 'The speed is unreal. Most downloaders take forever — DSSAVE processes everything in seconds. Installed the PWA and use it daily.',
    rating: 5,
    color: '#00D2FF',
    initials: 'MC',
  },
  {
    name: 'Sofia Mäkinen',
    handle: '@sofiacreative',
    text: 'Finally a clean UI with no shady pop-ups or fake download buttons. DSSAVE feels premium and trustworthy — I recommend it to everyone.',
    rating: 5,
    color: '#E1306C',
    initials: 'SM',
  },
  {
    name: 'Jordan Williams',
    handle: '@jwilliamsfilm',
    text: 'As a video editor I use DSSAVE multiple times a day. The multi-platform support and HD quality make my job so much easier.',
    rating: 5,
    color: '#1877F2',
    initials: 'JW',
  },
  {
    name: 'Yuki Tanaka',
    handle: '@yukidigital',
    text: 'The PWA install is incredible. It\'s on my home screen and works perfectly. No registration, no drama — just fast, clean downloads.',
    rating: 5,
    color: '#FF6B35',
    initials: 'YT',
  },
] as const

export const FORMATS = [
  { label: 'MP4 360p', badge: 'SD', badgeColor: 'rgba(130, 154, 177, 0.2)' },
  { label: 'MP4 720p', badge: 'HD', badgeColor: 'rgba(45, 156, 219, 0.2)' },
  { label: 'MP4 1080p', badge: 'FHD', badgeColor: 'rgba(0, 210, 255, 0.2)' },
  { label: 'MP3 Audio', badge: 'AUDIO', badgeColor: 'rgba(123, 97, 255, 0.2)' },
  { label: 'MP2 Audio', badge: 'AUDIO', badgeColor: 'rgba(123, 97, 255, 0.15)' },
] as const
