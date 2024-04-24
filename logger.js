const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: `./logs/${new Date().toJSON().replaceAll(':', '_').replace('.', '_')}.log` }),
    new winston.transports.Console({ format: winston.format.colorize() }),
  ],
});

module.exports = {
  logger
}