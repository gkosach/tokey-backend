#Docker CheatSheet

1. !important
   `Dont forget to change datasource db  `
Add in VPC
> docker exec -it back-app


Prisma Cheatsheet
Сброс базы и миграций

```bash
npx prismaConfig migrate reset
rm -rf prismaConfig/migrations
npx prismaConfig migrate dev --name init
npx prismaConfig migrate deploy
```

Создать новую миграцию

```bash
npx prismaConfig migrate dev --name <название>

```

Применить все миграции

```bash
npx prismaConfig migrate dev

```

Сгенерировать Prisma Client

```npm
npm run prismaConfig:generate

```

Заполнить базу тестовыми данными

```npm
npm run seed
```

Сгенерировать дополнительные типы

```npm
npm run postprisma:generate
```
