import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});
