// test/common/entrypoint/jest-setup-integration.ts
// ✅ Простой мок для integration тестов
jest.mock('@breez/service-template', () => ({
  SERVICE_PROVIDER: 'SERVICE_PROVIDER'
}));

jest.mock('@breez/service-template/dist/public_api', () => ({
  SERVICE_PROVIDER: 'SERVICE_PROVIDER'
}));
