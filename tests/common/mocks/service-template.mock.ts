export const serviceTemplateMock = {
  SERVICE_PROVIDER: 'SERVICE_PROVIDER',
  BaseError: class BaseError {
    public readonly status: any;
    public readonly data: any;
    public readonly message: string;

    constructor(status: any, message?: string, data?: any) {
      this.status = status;
      this.message = message || '';
      this.data = data;
    }
  },
  ErrorStatusList: {
    BadRequest: { code: 400, message: 'Bad Request' },
    Unauthorized: { code: 401, message: 'Unauthorized' },
    InternalError: { code: 500, message: 'Internal Error' },
    NotFound: { code: 404, message: 'Not Found' },
    TooManyRequests: { code: 429, message: 'Too Many Requests' }
  },
  AppConfig: {
    IsDevelopment: true,
    LoggingIO: true,
    getServiceOption: jest.fn(),
    Port: 3000,
    Name: 'test-service',
    UseClusters: false
  },
  authService: jest.fn().mockResolvedValue(undefined),
  initializeAppLifecycle: jest.fn().mockResolvedValue(undefined),
  AppClusterService: {
    clusterize: jest.fn()
  },
  EnvLoader: {
    load: jest.fn()
  },
  CONFIG_PATH: '/test/config'
};
