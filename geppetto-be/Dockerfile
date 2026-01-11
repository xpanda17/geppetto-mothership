FROM node:24-slim

# Install system dependencies for Puppeteer/Chromium
# These are the shared libraries Chromium needs to run in headless mode
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    libgconf-2-4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libgdk-pixbuf2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnss3-dev \
    libxss-dev \
    libasound2 \
    fonts-liberation \
    libappindicator3-1 \
    libnss3 \
    lsb-release \
    xdg-utils \
    libglib2.0-0 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# 2. Set environment variable to skip the automatic download of Chromium
# inside Puppeteer if you prefer to use the system-installed one,
# but usually, keeping the Puppeteer-downloaded one is safer for version matching.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Set a default if one isn't provided
ENV PORT=3000

# We use the ENV variable here
EXPOSE ${PORT}

CMD [ "npm", "start" ]