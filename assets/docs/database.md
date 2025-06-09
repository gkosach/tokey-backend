# База данных и Prisma

## Prisma команды

### Сброс базы и миграций

```bash
npx prisma migrate reset --force
rm -rf prisma/migrations
npx prisma migrate dev --name init
npx prisma migrate deploy
```

# Выполнить миграцию (указать название)

> npx prisma migrate dev --name <название>

### Применение миграций

```bash
npx prisma migrate dev
```

### Генерация Prisma Client

```bash
npx prisma generate
```

### Заполнение тестовыми данными

```bash
npm run seed
```

### Генерация дополнительных типов

```bash
npm run postprisma:generate
```

## Индексы для производительности

Схема оптимизирована с индексами для частых запросов:

- `idx_user_cognito` - Поиск по Cognito ID
- `idx_user_wallet` - Поиск по адресу кошелька
- `idx_property_dev_district` - Фильтрация по застройщику и району
- `idx_transaction_user_property` - Транзакции пользователя по объекту

## GDPR Compliance

Схема минимизирует персональные данные согласно GDPR:

- Хранится только необходимый минимум
- Нет избыточных персональных полей
- Четкие связи для удаления данных
