"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.logError = exports.logDebug = exports.logWarn = exports.logInfo = void 0;

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = _winston.default.createLogger({
  level: 'info',
  format: _winston.default.format.combine(_winston.default.format.timestamp(), _winston.default.format.printf(function (info) {
    return "".concat(info.timestamp, " ").concat(info.level, ": ").concat(info.message);
  })),
  transports: [// Write log to console for instance view
  new _winston.default.transports.Console(), // Write all errors to logs/error.log
  new _winston.default.transports.File({
    filename: 'logs/error.log',
    level: 'error'
  }), // Write other logs to logs/app.log
  new _winston.default.transports.File({
    filename: 'logs/app.log'
  })],
  exitOnError: false // do not exit on handled exceptions

});

var logInfo = function logInfo(message) {
  return logger.log('info', message);
};

exports.logInfo = logInfo;

var logWarn = function logWarn(message) {
  return logger.log('warn', message);
};

exports.logWarn = logWarn;

var logDebug = function logDebug(message) {
  return logger.log('debug', message);
};

exports.logDebug = logDebug;

var logError = function logError(message) {
  return logger.log('error', message);
};

exports.logError = logError;
var _default = logger;
exports.default = _default;