import { Test, TestingModule } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { NetworkInfoDto } from '../../../../src/interfaces/rest/controllers';
import { NetworksController } from '../../../../src/interfaces/rest/controllers/networks.controller';
import { ScriptService } from '../../../../src/script/script.service';

const mockNetworkData: NetworkInfoDto = {
  ipv4: {
    eth0: ['192.168.1.15'],
    wlan0: ['10.12.34.5']
  },
  ipv6: {
    eth0: ['fe80::a00:27ff:fe4e:66d1']
  },
  hostname: 'dev-machine',
  defaultRoute: {
    ipv4: { gateway: '192.168.1.1', interface: 'eth0' },
    ipv6: null
  },
  dns: ['192.168.1.1', '8.8.8.8']
};

const mockScriptService = {
  getNetworkInfo: jest.fn()
};

describe('NetworksController - Юнит тесты', () => {
  let controller: NetworksController;
  let scriptService: ScriptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NetworksController],
      providers: [
        {
          provide: ScriptService,
          useValue: mockScriptService
        }
      ]
    }).compile();

    controller = module.get<NetworksController>(NetworksController);
    scriptService = module.get<ScriptService>(ScriptService);
    jest.clearAllMocks();
    mockScriptService.getNetworkInfo.mockReturnValue(of(mockNetworkData));
  });

  describe('Инициализация контроллера', () => {
    it('должен быть определен', () => {
      expect(controller).toBeDefined();
      expect(controller).toBeInstanceOf(NetworksController);
    });

    it('должен иметь injected ScriptService', () => {
      expect(scriptService).toBeDefined();
      expect(scriptService).toBe(mockScriptService);
    });
  });

  describe('getNetworkInfo - Успешные сценарии', () => {
    it('должен возвращать Observable с сетевой информацией', done => {
      const result$ = controller.getNetworkInfo();
      expect(result$).toBeDefined();
      expect(typeof result$.subscribe).toBe('function');

      result$.subscribe({
        next: result => {
          expect(result).toEqual(mockNetworkData);
          done();
        },
        error: done.fail
      });
    });

    it('должен вызывать scriptService.getNetworkInfo ровно один раз', () => {
      controller.getNetworkInfo();
      expect(scriptService.getNetworkInfo).toHaveBeenCalledTimes(1);
      expect(scriptService.getNetworkInfo).toHaveBeenCalledWith();
    });

    it('должен возвращать корректную структуру IPv4 адресов', done => {
      const result$ = controller.getNetworkInfo();
      result$.subscribe({
        next: result => {
          expect(result.ipv4).toBeDefined();
          expect(typeof result.ipv4).toBe('object');
          expect(result.ipv4.eth0).toEqual(['192.168.1.15']);
          expect(result.ipv4.wlan0).toEqual(['10.12.34.5']);
          expect(Array.isArray(result.ipv4.eth0)).toBe(true);
          expect(Array.isArray(result.ipv4.wlan0)).toBe(true);
          done();
        },
        error: done.fail
      });
    });

    it('должен возвращать корректную структуру IPv6 адресов', done => {
      const result$ = controller.getNetworkInfo();
      result$.subscribe({
        next: result => {
          expect(result.ipv6).toBeDefined();
          expect(typeof result.ipv6).toBe('object');
          expect(result.ipv6.eth0).toEqual(['fe80::a00:27ff:fe4e:66d1']);
          expect(Array.isArray(result.ipv6.eth0)).toBe(true);
          done();
        },
        error: done.fail
      });
    });

    it('должен возвращать корректное имя хоста', done => {
      const result$ = controller.getNetworkInfo();
      result$.subscribe({
        next: result => {
          expect(result.hostname).toBeDefined();
          expect(typeof result.hostname).toBe('string');
          expect(result.hostname).toBe('dev-machine');
          expect(result.hostname.length).toBeGreaterThan(0);
          done();
        },
        error: done.fail
      });
    });

    it('должен возвращать корректную структуру маршрутов по умолчанию', done => {
      const result$ = controller.getNetworkInfo();

      result$.subscribe({
        next: result => {
          expect(result.defaultRoute).toBeDefined();
          expect(typeof result.defaultRoute).toBe('object');
          expect(result.defaultRoute.ipv4).toBeDefined();
          expect(result.defaultRoute.ipv4).not.toBeNull();

          if (result.defaultRoute.ipv4) {
            expect(result.defaultRoute.ipv4.gateway).toBe('192.168.1.1');
            expect(result.defaultRoute.ipv4.interface).toBe('eth0');
            expect(typeof result.defaultRoute.ipv4.gateway).toBe('string');
            expect(typeof result.defaultRoute.ipv4.interface).toBe('string');
          }

          expect(result.defaultRoute.ipv6).toBeNull();
          done();
        },
        error: done.fail
      });
    });

    it('должен возвращать корректный список DNS серверов', done => {
      const result$ = controller.getNetworkInfo();
      result$.subscribe({
        next: result => {
          expect(result.dns).toBeDefined();
          expect(Array.isArray(result.dns)).toBe(true);
          expect(result.dns).toEqual(['192.168.1.1', '8.8.8.8']);
          expect(result.dns.length).toBe(2);
          result.dns.forEach(dnsServer => {
            expect(typeof dnsServer).toBe('string');
            expect(dnsServer.length).toBeGreaterThan(0);
          });
          done();
        },
        error: done.fail
      });
    });

    it('должен возвращать полную структуру данных', done => {
      const result$ = controller.getNetworkInfo();
      result$.subscribe({
        next: result => {
          expect(result).toMatchObject({
            ipv4: expect.any(Object),
            ipv6: expect.any(Object),
            hostname: expect.any(String),
            defaultRoute: expect.any(Object),
            dns: expect.any(Array)
          });
          const expectedKeys = ['ipv4', 'ipv6', 'hostname', 'defaultRoute', 'dns'];
          const actualKeys = Object.keys(result);
          expect(actualKeys.sort()).toEqual(expectedKeys.sort());
          done();
        },
        error: done.fail
      });
    });
  });

  describe('getNetworkInfo - Обработка ошибок', () => {
    it('должен пробрасывать ошибки от ScriptService', done => {
      const errorMessage = 'Ошибка получения сетевой информации';
      const testError = new Error(errorMessage);
      mockScriptService.getNetworkInfo.mockReturnValue(throwError(() => testError));
      const result$ = controller.getNetworkInfo();
      result$.subscribe({
        next: () => {
          done.fail('Ожидалась ошибка, но получен успешный результат');
        },
        error: error => {
          expect(error).toBe(testError);
          expect(error.message).toBe(errorMessage);
          expect(scriptService.getNetworkInfo).toHaveBeenCalledTimes(1);
          done();
        }
      });
    });

    it('должен обрабатывать ошибки сети', done => {
      const networkError = new Error('NETWORK_SCRIPT_EXECUTION_ERROR');
      mockScriptService.getNetworkInfo.mockReturnValue(throwError(() => networkError));
      const result$ = controller.getNetworkInfo();
      result$.subscribe({
        next: () => {
          done.fail('Ожидалась ошибка сети');
        },
        error: error => {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe('NETWORK_SCRIPT_EXECUTION_ERROR');
          done();
        }
      });
    });

    it('должен обрабатывать таймауты', done => {
      const timeoutError = new Error('Timeout');
      mockScriptService.getNetworkInfo.mockReturnValue(throwError(() => timeoutError));
      const result$ = controller.getNetworkInfo();
      result$.subscribe({
        next: () => {
          done.fail('Ожидался таймаут');
        },
        error: error => {
          expect(error.message).toBe('Timeout');
          done();
        }
      });
    });

    it('должен обрабатывать неопределенные ошибки', done => {
      mockScriptService.getNetworkInfo.mockReturnValue(throwError(() => undefined));
      const result$ = controller.getNetworkInfo();
      result$.subscribe({
        next: () => {
          done.fail('Ожидалась неопределенная ошибка');
        },
        error: error => {
          expect(error).toBeUndefined();
          done();
        }
      });
    });
  });

  describe('getNetworkInfo - Граничные случаи', () => {
    it('должен обрабатывать пустые IPv4 интерфейсы', done => {
      const emptyIpv4Data = { ...mockNetworkData, ipv4: {} };
      mockScriptService.getNetworkInfo.mockReturnValue(of(emptyIpv4Data));
      const result$ = controller.getNetworkInfo();
      result$.subscribe({
        next: result => {
          expect(result.ipv4).toEqual({});
          expect(Object.keys(result.ipv4)).toHaveLength(0);
          done();
        },
        error: done.fail
      });
    });

    it('должен обрабатывать пустые IPv6 интерфейсы', done => {
      const emptyIpv6Data = { ...mockNetworkData, ipv6: {} };
      mockScriptService.getNetworkInfo.mockReturnValue(of(emptyIpv6Data));
      const result$ = controller.getNetworkInfo();
      result$.subscribe({
        next: result => {
          expect(result.ipv6).toEqual({});
          expect(Object.keys(result.ipv6)).toHaveLength(0);
          done();
        },
        error: done.fail
      });
    });

    it('должен обрабатывать пустой список DNS', done => {
      const emptyDnsData = { ...mockNetworkData, dns: [] };
      mockScriptService.getNetworkInfo.mockReturnValue(of(emptyDnsData));
      const result$ = controller.getNetworkInfo();
      result$.subscribe({
        next: result => {
          expect(result.dns).toEqual([]);
          expect(result.dns).toHaveLength(0);
          done();
        },
        error: done.fail
      });
    });

    it('должен обрабатывать отсутствие маршрутов по умолчанию', done => {
      const noDefaultRouteData = {
        ...mockNetworkData,
        defaultRoute: { ipv4: null, ipv6: null }
      };
      mockScriptService.getNetworkInfo.mockReturnValue(of(noDefaultRouteData));
      const result$ = controller.getNetworkInfo();
      result$.subscribe({
        next: result => {
          expect(result.defaultRoute.ipv4).toBeNull();
          expect(result.defaultRoute.ipv6).toBeNull();
          done();
        },
        error: done.fail
      });
    });
  });

  describe('getNetworkInfo - Производительность', () => {
    it('должен выполняться быстро (менее 100мс)', done => {
      // Подготовка
      const startTime = Date.now();
      const result$ = controller.getNetworkInfo();

      result$.subscribe({
        next: () => {
          const executionTime = Date.now() - startTime;
          expect(executionTime).toBeLessThan(100);
          done();
        },
        error: done.fail
      });
    });

    it('должен корректно работать при множественных вызовах', () => {
      const calls = Array.from({ length: 10 }, () => controller.getNetworkInfo());
      calls.forEach(call$ => {
        expect(call$).toBeDefined();
        expect(typeof call$.subscribe).toBe('function');
      });

      expect(scriptService.getNetworkInfo).toHaveBeenCalledTimes(10);
    });
  });
});
