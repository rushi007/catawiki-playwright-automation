FROM mcr.microsoft.com/playwright:focal

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

CMD ["npx", "playwright", "test", "--reporter=list"]