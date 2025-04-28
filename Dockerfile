# Stage 1: Сборка
FROM node:20-alpine AS builder

RUN apk update && \
    apk upgrade && \
    apk add --no-cache bash git openssh make cmake g++ python3

WORKDIR /app
COPY package*.json ./

# Устанавливаем ВСЕ зависимости (включая devDependencies)
RUN npm install --legacy-peer-deps --force

COPY . .

# Генерируем Prisma Client и собираем проект
RUN npx prisma generate && \
    npm run postprisma:generate && \
    npm run build

# Stage 2: Продакшн образ
FROM node:20-alpine
WORKDIR /app

# Копируем только нужные файлы
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

CMD ["node", "dist/index.js"]
