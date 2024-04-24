const winston = require('winston');

function createLogger(filenamePrefix) {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
      new winston.transports.File({ filename: `./logs/${filenamePrefix}${new Date().toJSON().replaceAll(':', '_').replace('.', '_')}.log` }),
      new winston.transports.Console({ format: winston.format.colorize() }),
    ],
  });

  return logger;
}

module.exports = {
  createLogger
}