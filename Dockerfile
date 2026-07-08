FROM mcr.microsoft.com/playwright:v1.54.0-jammy

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx playwright install --with-deps chromium firefox webkit

CMD ["sh", "-c", "npm test"]
