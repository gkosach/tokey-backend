# Prisma initial generation

```npm
npx prisma migrate dev --name init
```
# Перегенерация клиента Prisma

```npm
npm run prisma:generate
```


# Ручная генерация миграции

```npm
npm run typeorm -- migration:create src/database/migrations/RenameCognitoIdToId
```

# Запустить миграцию
