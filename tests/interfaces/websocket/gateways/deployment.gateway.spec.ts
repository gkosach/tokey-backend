import { Test, TestingModule } from '@nestjs/testing';
import { mockLogger } from '@test/common';
import { ErrorSeverity, LogLevels } from '../../../../src/interfaces/websocket/gateways';
import { DeploymentGateway } from '../../../../src/interfaces/websocket/gateways/deployment.gateway';

describe('DeploymentGateway Unit Tests', () => {
  let gateway: DeploymentGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeploymentGateway]
    }).compile();

    gateway = module.get<DeploymentGateway>(DeploymentGateway);
    (gateway as any).logger = mockLogger;
    (gateway as any).server = {
      to: jest.fn().mockReturnValue({
        emit: jest.fn()
      })
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Gateway Definition', () => {
    it('should be defined', () => {
      expect(gateway).toBeDefined();
    });
  });

  describe('Event Broadcasting Methods', () => {
    const taskId = 'inst_test_123';

    it('should call server.to with correct room for progress update', () => {
      const toSpy = jest.spyOn((gateway as any).server, 'to');

      gateway.sendProgressUpdate(taskId, 1, 'Test progress', 50);

      expect(toSpy).toHaveBeenCalledWith(`deployment_${taskId}`);
    });

    it('should call server.to with correct room for log message', () => {
      const toSpy = jest.spyOn((gateway as any).server, 'to');

      // ✅ Используем enum вместо строки
      gateway.sendLogMessage(taskId, LogLevels.INFO, 'installer', 'Test log message');

      expect(toSpy).toHaveBeenCalledWith(`deployment_${taskId}`);
    });

    it('should call server.to with correct room for error occurred', () => {
      const toSpy = jest.spyOn((gateway as any).server, 'to');

      // ✅ Используем enum для severity
      gateway.sendErrorOccurred(taskId, ErrorSeverity.CRITICAL, 'TEST_ERROR', 'Test error message');

      expect(toSpy).toHaveBeenCalledWith(`deployment_${taskId}`);
    });

    it('should call server.to with correct room for installation complete', () => {
      const toSpy = jest.spyOn((gateway as any).server, 'to');

      gateway.sendInstallationComplete(taskId, 'https://test.example.com');

      expect(toSpy).toHaveBeenCalledWith(`deployment_${taskId}`);
    });

    it('should call server.to with correct room for installation cancelled', () => {
      const toSpy = jest.spyOn((gateway as any).server, 'to');

      gateway.sendInstallationCancelled(taskId, 'user_requested', 'Test cancellation');

      expect(toSpy).toHaveBeenCalledWith(`deployment_${taskId}`);
    });
  });

  describe('Message Content Validation', () => {
    const taskId = 'inst_test_123';

    it('should send progress update with correct message structure', () => {
      const emitSpy = jest.fn();
      (gateway as any).server = {
        to: jest.fn().mockReturnValue({ emit: emitSpy })
      };

      gateway.sendProgressUpdate(taskId, 2, 'Installing packages', 75);

      expect(emitSpy).toHaveBeenCalledWith(
        'progress_update',
        expect.objectContaining({
          type: 'progress_update',
          taskId,
          data: expect.objectContaining({
            step: 2,
            message: 'Installing packages',
            percentComplete: 75
          })
        })
      );
    });

    it('should send log message with correct structure', () => {
      const emitSpy = jest.fn();
      (gateway as any).server = {
        to: jest.fn().mockReturnValue({ emit: emitSpy })
      };

      gateway.sendLogMessage(taskId, LogLevels.WARNING, 'system', 'Warning message');

      expect(emitSpy).toHaveBeenCalledWith(
        'log_message',
        expect.objectContaining({
          type: 'log_message',
          taskId,
          data: expect.objectContaining({
            level: LogLevels.WARNING,
            source: 'system',
            text: 'Warning message'
          })
        })
      );
    });

    it('should send error with correct structure', () => {
      const emitSpy = jest.fn();
      (gateway as any).server = {
        to: jest.fn().mockReturnValue({ emit: emitSpy })
      };

      gateway.sendErrorOccurred(taskId, ErrorSeverity.WARNING, 'WARN_001', 'Non-critical warning');

      expect(emitSpy).toHaveBeenCalledWith(
        'error_occurred',
        expect.objectContaining({
          type: 'error_occurred',
          taskId,
          data: expect.objectContaining({
            severity: ErrorSeverity.WARNING,
            code: 'WARN_001',
            message: 'Non-critical warning'
          })
        })
      );
    });
  });

  describe('All LogLevels Support', () => {
    const taskId = 'inst_test_123';

    it('should support all log levels', () => {
      const emitSpy = jest.fn();
      (gateway as any).server = {
        to: jest.fn().mockReturnValue({ emit: emitSpy })
      };

      // ✅ Тестируем все уровни логирования
      gateway.sendLogMessage(taskId, LogLevels.INFO, 'test', 'Info message');
      gateway.sendLogMessage(taskId, LogLevels.WARNING, 'test', 'Warning message');
      gateway.sendLogMessage(taskId, LogLevels.ERROR, 'test', 'Error message');
      gateway.sendLogMessage(taskId, LogLevels.DEBUG, 'test', 'Debug message');

      expect(emitSpy).toHaveBeenCalledTimes(4);
    });
  });

  describe('All ErrorSeverity Support', () => {
    const taskId = 'inst_test_123';

    it('should support all error severities', () => {
      const emitSpy = jest.fn();
      (gateway as any).server = {
        to: jest.fn().mockReturnValue({ emit: emitSpy })
      };

      // ✅ Тестируем все уровни серьезности
      gateway.sendErrorOccurred(taskId, ErrorSeverity.CRITICAL, 'ERR_001', 'Critical error');
      gateway.sendErrorOccurred(taskId, ErrorSeverity.WARNING, 'WARN_001', 'Warning error');

      expect(emitSpy).toHaveBeenCalledTimes(2);
    });
  });
});
