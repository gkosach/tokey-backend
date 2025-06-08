// test/common/entrypoint/jest-setup-unit.ts
import { serviceTemplateMock } from '../mocks/service-template.mock';

// ✅ Используем полный мок для unit тестов
jest.mock('@breez/service-template', () => serviceTemplateMock);
jest.mock('@breez/service-template/dist/public_api', () => serviceTemplateMock);
