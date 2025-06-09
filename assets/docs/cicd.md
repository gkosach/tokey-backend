# CI/CD Documentation

## Overview

Автоматизированная система контроля качества кода и тестирования для TyKey Backend проекта с использованием Husky Git hooks и автоматической генерацией coverage badges.

## 🎯 Coverage Badges

### Автоматическая генерация

- Coverage badges генерируются автоматически после прохождения тестов
- Сохраняются в `assets/coverage/` и отображаются в README
- Отражают покрытие: lines, statements, branches, functions
- Используют хакерский стиль с анимированными лоадерами

### Структура badges

```text
assets/coverage/
├── badge-coverage.svg # Общее покрытие (lines)
├── badge-statements.svg # Покрытие statements
├── badge-branches.svg # Покрытие branches
└── badge-functions.svg # Покрытие functions
```

### Команды

```bash
npm run test:badges # Тесты + генерация badges
npm run generate-badges # Только генерация badges

```

## 🔒 Git Hooks с Husky

### Pre-commit Hook

**Запускается при каждом коммите**

- ✅ ESLint проверка кода
- ✅ TypeScript компиляция
- ❌ Блокирует коммит при ошибках

### Pre-push Hook

**Запускается при каждом push**

- ✅ Полный набор тестов с coverage
- ✅ Автоматическая генерация badges
- ✅ Автоматическое добавление обновленных badges в коммит
- ❌ Блокирует push если тесты не прошли

## Workflow

1. Пишешь код → `git commit` → проверки качества
2. `git push` → тесты + обновление badges
3. Если тесты не прошли → push заблокирован
