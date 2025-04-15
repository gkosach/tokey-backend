# Prisma Commands Documentation

Reset migariont history:

```bash
npx prisma migrate reset
y
rm -rf prisma/migrations
npx prisma migrate dev --name init
npx prisma migrate deploy
```

Generate a new migration with a specified name.

```bash
npx prisma migrate dev --name tokens
```

Apply all migrations from the`migrations` folder.

```bash
npx prisma migrate dev
```

Regenerate the Prisma client based on schema changes.

```npm
npm run prisma:generate
```

Seed the database with mock data.

```npm
npm run seed
```

Primsa Types

```npm
npm run postprisma:generate
```

---

## 📚 Documentation Links

| **Topic**                                                   |
| ----------------------------------------------------------- |
| [Конфигурирование приложения](assets/docs/nginx.md)         |
| [AWS EC2 Instructions](assets/docs/aws-ec2-instructions.md) |
| [Technical Task SOlana](assets/docs/purchase-token.md)      |
| [KYC Technical Task](assets/docs/)                          |
| [Financial Management](assets/docs/costs.md)                |

---
