const winston = require('winston')

const options = {
  file: {
      
    level: 'info',
    filename: 'c:\\logs\\lms\\WebApi\\app.log',
    handleExceptions: true,
    json: true,
    maxsize: 1242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: true,
    colorize: true,
  },
};

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  
  exitOnError: false
})

module.exports = logger


