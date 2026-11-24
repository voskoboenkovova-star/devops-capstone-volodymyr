FROM node:20-alpine

WORKDIR /app

# Спочатку копіюємо лише файли залежностей для ефективного кешування шарів
COPY src/package*.json ./
RUN npm ci --omit=dev

# Копіюємо код застосунку
COPY src/ ./

# Запускаємо контейнер від непривілейованого користувача
USER node

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]