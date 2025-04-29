#Docker CheatSheet

1. !important
   `Dont forget to change datasource db  `
   Add in VPC
   > docker exec -it back-app

Prisma Cheatsheet
Сброс базы и миграций

```bash
npx prisma migrate reset --force
rm -rf prisma/migrations        
npx prisma migrate dev --name init 
npx prisma migrate deploy       
```   

Создать новую миграцию

```bash
npx prisma migrate dev --name <название>
```

Применить все миграции

```bash
npx prisma migrate dev
```

Сгенерировать Prisma Client

```bash
npx prisma generate
```

Заполнить базу тестовыми данными

```bash
npx ts-node prisma/seed.ts
```

Сгенерировать дополнительные типы

```npm
npm run postprisma:generate
```
