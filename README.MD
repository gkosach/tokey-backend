```npm
psql -h turntable.proxy.rlwy.net -p 54156 -U postgres -d railway -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
```

# Ручная генерация миграции

```npm
npm run typeorm -- migration:create src/database/migrations/RenameCognitoIdToId

```

# Применение миграций

```npm
rm -rf src/migrations/*
npm run migrate:dev migration:generate src/database/migrations/Initial
```
