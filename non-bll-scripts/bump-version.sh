#!/bin/bash
cd types

# Получаем текущую версию
CURRENT_VERSION=$(node -p "require('./package.json').version")

# Разбиваем на части
IFS='.' read -ra VERSION_PARTS <<< "$CURRENT_VERSION"
MAJOR=${VERSION_PARTS[0]}
MINOR=${VERSION_PARTS[1]}
PATCH=${VERSION_PARTS[2]}

# Увеличиваем патч-версию
NEW_VERSION="$MAJOR.$MINOR.$((PATCH+1))"

# Обновляем package.json
npm version $NEW_VERSION --no-git-tag-version

echo "Version bumped from $CURRENT_VERSION to $NEW_VERSION"
