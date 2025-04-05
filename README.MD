```npm
psql -h turntable.proxy.rlwy.net -p 54156 -U postgres -d railway -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
```

# Применение миграций

```npm
rm -rf src/migrations/*
npm run migrate:dev migration:generate src/migrations/Initial
```
