import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => {
      return `${info.timestamp} ${info.level}: ${info.message}`;
    })
  ),
  transports: [
    // Write log to console for instance view
    new winston.transports.Console(),

    // Write all errors to logs/error.log
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),

    // Write other logs to logs/app.log
    new winston.transports.File({ filename: 'logs/app.log' })
  ],
  exitOnError: false, // do not exit on handled exceptions
});

const logInfo = message => logger.log('info', message);
const logWarn = message => logger.log('warn', message);
const logDebug = message => logger.log('debug', message);
const logError = message => logger.log('error', message);

export {
  logInfo, logWarn, logDebug, logError,
};

export default logger;
