# CI/CD Process

## Git Flow & Branch Protection

### Branch Structure

- `german`, `nikita` - developer working branches
- `main` - stable branch for releases
- `testnet` - testing environment
- `production` - production environment

### Protected Branches

- **main**: Only PR merges allowed from german/nikita
- **testnet**: Only PR merges allowed from main
- **production**: Only PR merges allowed from main

## Automated Testing

### GitHub Actions

Tests run automatically on:

- Pull requests to `main`, `testnet`, `production`
- Direct pushes to `main`, `testnet`, `production`

### Coverage Badges

- Auto-generated after tests on `main` branch
- Stored in `assets/coverage/`
- Updated automatically in commits

## Developer Workflow

### 1. Feature Development
