FROM node:20-slim

# Install Python, ffmpeg, pip
RUN apt-get update && apt-get install -y \
    python3 python3-pip ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Install yt-dlp dan certifi
RUN pip3 install --break-system-packages yt-dlp certifi

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source dan build frontend
COPY . .
RUN npm run build

EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001

CMD ["node", "dist/server/index.js"]
