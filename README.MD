# TyKey Backend

[![Coverage](./assets/coverage/badge-lines.svg)](./coverage/lcov-report/index.html)
[![Statements](./assets/coverage/badge-statements.svg)](./coverage/lcov-report/index.html)
[![Branches](./assets/coverage/badge-branches.svg)](./coverage/lcov-report/index.html)
[![Functions](./assets/coverage/badge-functions.svg)](./coverage/lcov-report/index.html)

### 1. Установка

```bash
npm install
```

### 2. Настройка окружения

```ssh
cp .env.example .development.env
```

Заполните переменные в .development.env

### 3. Запуск с Docker

```bash
docker compose up -d
```

### 4. Настройка базы данных

```ssh
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

Внутри контейнера или локально

```bash
npx prisma migrate dev --name init
```

```bash
npx prisma generate
npm run seed
```

### 5. Проверка работы

```bash
curl http://localhost:3002/
```

### 4. Запуск в режиме разработки

```ssh
npm run dev
```

## 📋 Команды управления

| Команда                   | Назначение                   |
| ------------------------- | ---------------------------- |
| `npm run dev`             | Запуск в development режиме  |
| `docker compose up -d`    | Запуск с Docker              |
| `npm run build`           | Сборка production версии     |
| `npm run start`           | Запуск production версии     |
| `npm run prisma:generate` | Генерация Prisma Client      |
| `npm run prisma:migrate`  | Применение миграций          |
| `npm run seed`            | Заполнение тестовыми данными |
| `npm run lint`            | Проверка кода ESLint         |
| `npm run format:prettier` | Форматирование кода          |

## Документация

| Раздел                                          | Описание                         |
| ----------------------------------------------- | -------------------------------- |
| [Конфигурация](assets/docs/configuration.md)    | Настройка окружения и переменных |
| [База данных](assets/docs/database.md)          | Схема БД, миграции и Prisma      |
| [API Endpoints](assets/docs/api.md)             | REST API эндпоинты               |
| [Аутентификация](assets/docs/authentication.md) | AWS Cognito и JWT токены         |
| [KYC интеграция](assets/docs/kyc.md)            | Persona API и верификация        |
| [HSM интеграция](assets/docs/hsm.md)            | Управление кошельками и ключами  |
| [Развертывание](assets/docs/deployment.md)      | Docker и production деплой       |
| [Безопасность](assets/docs/security.md)         | Политики безопасности и GDPR     |
| [CI/CD Process](assets/docs/cicd.md)            | Git hooks и автоматизация        |

## Требования к окружению

- Node.js 18+
- PostgreSQL 14+
- Docker (опционально)

## Лицензия

Proprietary - ToKey Platform

---

Для получения доступа к API обратитесь к команде разработки.
