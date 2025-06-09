import 'reflect-metadata';

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
    InternalError: { code: 500, message: 'Internal Error' }
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
    InternalError: { code: 500, message: 'Internal Error' }
  },
  AppConfig: {
    IsDevelopment: true,
    LoggingIO: true,
    getServiceOption: jest.fn()
  },
  authService: jest.fn().mockResolvedValue(undefined),
  initializeAppLifecycle: jest.fn().mockResolvedValue(undefined)
}));

// Настройки для интеграционных тестов
process.env.NODE_ENV = 'test';
jest.setTimeout(30000);

// Подавляем логи
console.log = jest.fn();
console.warn = jest.fn();
console.error = jest.fn();
