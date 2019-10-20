import path from 'path'
import fs from 'fs'
import { createLogger, format, transports, addColors } from 'winston'

const log_directory = path.resolve('./', 'log')
fs.existsSync(log_directory) || fs.mkdirSync(log_directory)

const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
    http: 7
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
    http: 'yellow'
  }
}

addColors(config.colors)

const options = {
  all_log: {
    level: 'http',
    filename: path.resolve(log_directory, `${new Date().toISOString().split('T')[0].replace(/-/g, '')}.log`)
  },
  error_log: {
    level: 'error',
    filename: path.resolve(log_directory, `${new Date().toISOString().split('T')[0].replace(/-/g, '')}.error.log`)
  }
}

function format_params(info) {
  let { timestamp, level, message } = info
  message = message.replace(/[\r\n]/g, '')
  return `[${timestamp}] ${level}: ${message}`
}

const logger = createLogger({
  level: 'http',
  levels: config.levels,
  handleExceptions: true,
  json: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(format_params)
  ),
  transports: [new transports.File(options.all_log), new transports.File(options.error_log), new transports.Console()]
})

logger.stream = {
  write: function(message) {
    logger.http(message)
  }
}

export default logger

