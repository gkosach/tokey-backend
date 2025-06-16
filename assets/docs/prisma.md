# База данных и Prisma

## Локальная разработка

```bash
# Создание миграции
dotenv -e .development.env -- npx prisma migrate dev --name <название>

# Применение миграций
dotenv -e .development.env -- npx prisma migrate dev

# Генерация клиента
npx prisma generate

# Заполнение данными
dotenv -e .development.env -- npm run seed
```

---

## Продакшн

```bash
# Применение миграций
npx prisma migrate deploy

# Генерация клиента
npx prisma generate

# Запуск приложения
npm run start
```

---

## Emergency

```bash
# Сброс БД (если нужно)
dotenv -e .development.env -- npx prisma migrate reset --force
```
