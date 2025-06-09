// test/common/entrypoint/jest-setup.ts
import 'reflect-metadata';

/**
 * Настройки для всех тестов
 */
process.env.NODE_ENV = 'test';
process.env.MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

/**
 * Увеличиваем таймауты
 */
jest.setTimeout(30000);

/**
 * Подавляем логи во время тестов
 */
console.log = jest.fn();
console.warn = jest.fn();
console.error = jest.fn();

// ✅ Мокаем service-template
jest.mock('@breez/service-template', () => ({
  SERVICE_PROVIDER: 'SERVICE_PROVIDER',
  BaseError: class BaseError {
    constructor(
      public status: any,
      public message?: string,
      public data?: any
    ) {}
  },
  ErrorStatusList: {
    BadRequest: { code: 400, message: 'Bad Request' },
    InternalError: { code: 500, message: 'Internal Error' },
    NotFound: { code: 404, message: 'Not Found' }
  },
  AppConfig: {
    IsDevelopment: true,
    LoggingIO: true,
    getServiceOption: jest.fn()
  },
  authService: jest.fn().mockResolvedValue(undefined),
  initializeAppLifecycle: jest.fn().mockResolvedValue(undefined)
}));

jest.mock('@breez/service-template/dist/public_api', () => ({
  SERVICE_PROVIDER: 'SERVICE_PROVIDER',
  BaseError: class BaseError {
    constructor(
      public status: any,
      public message?: string,
      public data?: any
    ) {}
  },
  ErrorStatusList: {
    BadRequest: { code: 400, message: 'Bad Request' },
    InternalError: { code: 500, message: 'Internal Error' },
    NotFound: { code: 404, message: 'Not Found' }
  },
  AppConfig: {
    IsDevelopment: true,
    LoggingIO: true,
    getServiceOption: jest.fn()
  },
  authService: jest.fn().mockResolvedValue(undefined),
  initializeAppLifecycle: jest.fn().mockResolvedValue(undefined)
}));

// ✅ Мокаем логгер
jest.mock('@common/utils/helpers/logger.hepler', () => ({
  ConditionalLogger: jest.fn().mockImplementation(() => ({
    debugLog: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    log: jest.fn()
  }))
}));

// ✅ Мокаем custom injector без типов в параметрах
jest.mock('@so1tan0v/nestjs-custom-injector', () => ({
  CustomInject: () => (target: any, propertyKey: string) => {
    Object.defineProperty(target, propertyKey, {
      get: () => ({}),
      configurable: true
    });
  }
}));
