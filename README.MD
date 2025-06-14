# ToKey Backend

[![Coverage](./assets/coverage/badge-coverage.svg)](./coverage/lcov-report/index.html)
[![Statements](./assets/coverage/badge-statements.svg)](./coverage/lcov-report/index.html)
[![Branches](./assets/coverage/badge-branches.svg)](./coverage/lcov-report/index.html)
[![Functions](./assets/coverage/badge-functions.svg)](./coverage/lcov-report/index.html)

### 1. Установка

```bash
npm install
```

> Git hooks установятся автоматически

### 2. Настройка окружения

```ssh
cp .env.example .development.env
```

Заполните переменные в .development.env

### 3. Запуск с Docker

#### Локальная разработка

``bash

# Docker: Development

```bash
docker-compose -f docker-compose.dev.yml up -d --build
```

# Docker: Production

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

### Запуск сервера для разработки

```ssh
npm run dev
```

## Документация

| Раздел                                                    | Описание                                   |
| --------------------------------------------------------- | ------------------------------------------ |
| [Конфигурация](assets/docs/configuration.md)              | Настройка окружения и переменных           |
| [Модульная архитектура](assets/docs/development-guide.md) | Гайд по архитектуре и поддержке приложения |
| [База данных & Prisma](assets/docs/prisma.md)             | Скрипты миграциq к Prisma                  |
| [API Endpoints](assets/docs/api.md)                       | REST API эндпоинты                         |
| [Аутентификация](assets/docs/authentication.md)           | AWS Cognito и JWT токены                   |
| [KYC интеграция](assets/docs/kyc.md)                      | Persona API и верификация                  |
| [HSM интеграция](assets/docs/hsm.md)                      | Управление кошельками и ключами            |
| [Развертывание](assets/docs/deployment.md)                | Docker и production деплой                 |
| [Безопасность](assets/docs/security.md)                   | Политики безопасности и GDPR               |
| [CI/CD Process](assets/docs/cicd.md)                      | Git hooks и автоматизация                  |

## Требования к окружению

- Node.js 18+
- PostgreSQL 14+
- Docker (опционально)

## Лицензия

Proprietary - ToKey Platform

---

Для получения доступа к API обратитесь к команде разработки.
