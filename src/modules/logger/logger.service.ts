import * as winston from 'winston';
import { Injectable, Scope, ConsoleLogger as CustomLogger } from '@nestjs/common';
import * as winstonDaily from 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize } = winston.format;
const logDir = 'logs';
const transports = [
  new winstonDaily({
    level: 'info',
    datePattern: 'YYYY-MM-DD',
    dirname: logDir,
    filename: `%DATE%.log`,
    maxFiles: 30, // 30일치 로그 파일 저장
    zippedArchive: true,
  }),
  // error 레벨 로그를 저장할 파일 설정
  new winstonDaily({
    level: 'error',
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + '/error', // error.log 파일은 /logs/error 하위에 저장
    filename: `%DATE%.error.log`,
    maxFiles: 30,
    zippedArchive: true,
  }),
];

const loggerFormat = printf(({ level, message, timestamp }) => {
  return colorize().colorize(level, `${timestamp} [${level}] : ${message}`);
});

@Injectable({ scope: Scope.TRANSIENT })
export default class LoggerService extends CustomLogger {
  constructor(
    private readonly logger = winston.createLogger({
      levels: winston.config.npm.levels,
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        loggerFormat,
      ),
      transports,
    }),
  ) {
    super();
  }
}