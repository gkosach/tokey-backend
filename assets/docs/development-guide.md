# 🏗️ Структура модуля

Каждый модуль состоит из 4 файлов:

```text
user/
├── user.module.ts     # Конфигурация модуля
├── user.routes.ts     # HTTP маршруты
├── user.controller.ts # Обработка запросов
└── user.service.ts    # Бизнес-логика
```

## 📝 Конфигурация модуля

```typescript
export const UserModule: ModuleConfig = {
  routes: [userRoutes],
  services: [UserService],
  controllers: [UserController],
};
```

## 🔄 Регистрация модулей

В modules/index.ts:

```typescript
export const APP_MODULES = [UserModule, WalletModule, PropertyModule, KycModule];
```

➕ Добавить новый модуль

1. Создать папку в /modules
2. Реализовать 4 файла (module, routes, controller, service)
3. Добавить в APP_MODULES

🎯 Принципы

- Routes: Только пути + middleware
- Controllers: Только HTTP логика
- Services: Только бизнес-логика
- Modules: Минимальная конфигурация

---

## FAQ

**Q: Когда создавать новый модуль?**
A: Когда функциональность не связана с существующими доменами или модуль становится слишком большим.

**Q: Можно ли вызывать сервисы других модулей?**
A: Да, но через зависимости или события. Избегайте циклических зависимостей.

**Q: Нужно ли создавать интерфейсы для сервисов?**
A: Для MVP не обязательно, но рекомендуется для больших проектов.

Q: Как тестировать модули?
A: Сервисы - unit тесты.
