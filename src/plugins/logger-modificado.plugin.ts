import winston, { format } from 'winston';

const { combine, timestamp, json, printf, colorize } = format;

// Formato personalizado con colores para consola
const consoleFormat = printf(({ level, message, service, timestamp }) => {
  return `${timestamp} [${service}] ${level}: ${message}`;
});


export const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    json(),
  ),
  // defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

logger.add(new winston.transports.Console({
  format: combine(
    colorize({ all: true }), // Agrega colores a todos los niveles
    consoleFormat
  ),
}));

export const buildLogger = (service: string ) => {

  return {
    error: (message: string) => {
      logger.error('error', { message, service });
    },
    warn: (message: string) => {
      logger.warn('warn', { message, service });
    },
    info: (message: string) => {
      logger.info('info', { message, service });
    },
    http: (message: string) => {
      logger.http('http', { message, service });
    },
    verbose: (message: string) => {
      logger.verbose('verbose', { message, service });
    },
    debug: (message: string) => {
      logger.debug('debug', { message, service });
    },
    silly: (message: string) => {
      logger.silly('silly', { message, service });
    }
  }

}
