# Конфигурация окружения

## Переменные окружения

### Обязательные переменные

```dotenv
DATABASE_URL=postgresql://username:password@host:port/database
PORT=3002
NODE_ENV=development
AWS_REGION=us-east-1
COGNITO_USER_POOL_ID=your_user_pool_id
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
S3_BUCKET_NAME=your_bucket_name
PERSONA_API_KEY=your_persona_api_key
PERSONA_TEMPLATE_ID=your_persona_template_id
NEXT_PERSONA_SHA=your_persona_sha
```

### Файлы окружения

- `.env` - Production окружение
- `.development.env` - Development окружение
- `.env.example` - Шаблон для команды

### Валидация переменных

Приложение автоматически валидирует все обязательные переменные при запуске
