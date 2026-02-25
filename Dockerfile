# Use official Playwright image with all browsers
FROM mcr.microsoft.com/playwright:v1.58.2-jammy

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the source code
COPY . .

# Build TypeScript if needed
RUN npx tsc

# Install browsers explicitly
RUN npx playwright install --with-deps

RUN npx playwright install chrome

# Default command: run tests
CMD ["npx", "playwright", "test"]