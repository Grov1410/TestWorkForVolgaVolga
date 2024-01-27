# Этап с установкой зависимостей
FROM node:20.10-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --no-package-lock
COPY . .
RUN npm run build

# Финальный образ
FROM node:20.10-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm install --no-package-lock --only=production
CMD ["npm", "start"]


