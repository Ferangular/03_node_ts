
import { jest } from "@jest/globals";
import { buildLogger, logger as winstonLogger } from "../../src/plugins/logger-modificado.plugin";




describe('plugins/logger-modificado.plugin.ts', () => {

  test('buildLogger should return a logger with all methods',()=> {

    const logger = buildLogger('test');

    expect( typeof logger.error ).toBe('function');
    expect( typeof logger.warn ).toBe('function');
    expect( typeof logger.info ).toBe('function');
    expect( typeof logger.http ).toBe('function');
    expect( typeof logger.verbose ).toBe('function');
    expect( typeof logger.debug ).toBe('function');
    expect( typeof logger.silly ).toBe('function');

  });

  test('logger.info should log an info message', () => {

    const winstonLoggerMock = jest.spyOn(winstonLogger,'info');
    const message = 'test info message';
    const service = 'test service';

    const logger = buildLogger(service);

    logger.info(message);

    expect( winstonLoggerMock ).toHaveBeenCalledWith(
      'info',
      expect.objectContaining({
        message,
        service,
      }),
    );

  });

  test('logger.error should log an error message', () => {

    const winstonLoggerMock = jest.spyOn(winstonLogger,'error');
    const message = 'test error message';
    const service = 'test service';

    const logger = buildLogger(service);

    logger.error(message);

    expect( winstonLoggerMock ).toHaveBeenCalledWith(
      'error',
      expect.objectContaining({
        message,
        service,
      }),
    );

  });

  test('logger.warn should log a warning message', () => {

    const winstonLoggerMock = jest.spyOn(winstonLogger,'warn');
    const message = 'test warning message';
    const service = 'test service';

    const logger = buildLogger(service);

    logger.warn(message);

    expect( winstonLoggerMock ).toHaveBeenCalledWith(
      'warn',
      expect.objectContaining({
        message,
        service,
      }),
    );

  });

  test('logger.http should log an http message', () => {

    const winstonLoggerMock = jest.spyOn(winstonLogger,'http');
    const message = 'test http message';
    const service = 'test service';

    const logger = buildLogger(service);

    logger.http(message);

    expect( winstonLoggerMock ).toHaveBeenCalledWith(
      'http',
      expect.objectContaining({
        message,
        service,
      }),
    );

  });

  test('logger.verbose should log a verbose message', () => {

    const winstonLoggerMock = jest.spyOn(winstonLogger,'verbose');
    const message = 'test verbose message';
    const service = 'test service';

    const logger = buildLogger(service);

    logger.verbose(message);

    expect( winstonLoggerMock ).toHaveBeenCalledWith(
      'verbose',
      expect.objectContaining({
        message,
        service,
      }),
    );

  });

  test('logger.debug should log a debug message', () => {

    const winstonLoggerMock = jest.spyOn(winstonLogger,'debug');
    const message = 'test debug message';
    const service = 'test service';

    const logger = buildLogger(service);

    logger.debug(message);

    expect( winstonLoggerMock ).toHaveBeenCalledWith(
      'debug',
      expect.objectContaining({
        message,
        service,
      }),
    );

  });

  test('logger.silly should log a silly message', () => {

    const winstonLoggerMock = jest.spyOn(winstonLogger,'silly');
    const message = 'test silly message';
    const service = 'test service';

    const logger = buildLogger(service);

    logger.silly(message);

    expect( winstonLoggerMock ).toHaveBeenCalledWith(
      'silly',
      expect.objectContaining({
        message,
        service,
      }),
    );

  });



});