import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import request from 'supertest';
import { NetworksController } from '../../../../src/interfaces/rest/controllers/networks.controller';
import { ScriptService } from '../../../../src/script/script.service';

const mockScriptService = {
  getNetworkInfo: jest.fn().mockReturnValue(
    of({
      ipv4: { eth0: ['192.168.1.15'], wlan0: ['10.12.34.5'] },
      ipv6: { eth0: ['fe80::a00:27ff:fe4e:66d1'] },
      hostname: 'dev-machine',
      defaultRoute: {
        ipv4: { gateway: '192.168.1.1', interface: 'eth0' },
        ipv6: null
      },
      dns: ['192.168.1.1', '8.8.8.8']
    })
  )
};

describe('NetworksController - Интеграционные тесты', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [NetworksController],
      providers: [
        {
          provide: ScriptService,
          useValue: mockScriptService
        }
      ]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /networks/info', () => {
    it('должен возвращать 200 и сетевую информацию', async () => {
      const response = await request(app.getHttpServer()).get('/networks/info').expect(200);

      // Проверяем структуру ответа
      expect(response.body).toHaveProperty('ipv4');
      expect(response.body).toHaveProperty('ipv6');
      expect(response.body).toHaveProperty('hostname');
      expect(response.body).toHaveProperty('defaultRoute');
      expect(response.body).toHaveProperty('dns');

      // Проверяем конкретные значения
      expect(response.body.hostname).toBe('dev-machine');
      expect(response.body.ipv4.eth0).toEqual(['192.168.1.15']);
      expect(response.body.dns).toEqual(['192.168.1.1', '8.8.8.8']);
    });

    it('должен возвращать правильный Content-Type', async () => {
      await request(app.getHttpServer()).get('/networks/info').expect('Content-Type', /json/).expect(200);
    });

    it('должен возвращать правильную структуру ответа', async () => {
      const response = await request(app.getHttpServer()).get('/networks/info').expect(200);

      expect(response.body).toMatchObject({
        ipv4: expect.any(Object),
        ipv6: expect.any(Object),
        hostname: expect.any(String),
        defaultRoute: {
          ipv4: expect.any(Object),
          ipv6: null
        },
        dns: expect.any(Array)
      });
    });
  });

  describe('Обработка ошибок', () => {
    it('должен обрабатывать несуществующие эндпоинты', async () => {
      await request(app.getHttpServer()).get('/networks/nonexistent').expect(404);
    });

    it('должен обрабатывать неверные HTTP методы', async () => {
      await request(app.getHttpServer()).post('/networks/info').expect(404);
    });
  });

  describe('Производительность', () => {
    it('должен отвечать в разумное время', async () => {
      const startTime = Date.now();

      await request(app.getHttpServer()).get('/networks/info').expect(200);

      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThan(1000);
    });
  });
});
