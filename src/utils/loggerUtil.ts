import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;

// 13:32:20.585 [main] INFO: My message goes here

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'main' }), timestamp(), myFormat),
  transports: [new transports.Console()],
});
