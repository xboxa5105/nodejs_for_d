import morgan from 'morgan';
import logger from '../config/winston'

morgan.token(`status`, (req, res) => {
    const status = (typeof res.headersSent !== `boolean`
        ? Boolean(res._header)
        : res.headersSent)
        ? res.statusCode
        : undefined
    const color =
        status >= 500
            ? 31 // red
            : status >= 400
                ? 33 // yellow
                : status >= 300
                    ? 36 // cyan
                    : status >= 200
                        ? 32 // green
                        : 0 // no color
    return `\x1b[${color}m${status}\x1b[0m`
})
const morgan_format = ':remote-addr :method :url :status :response-time ms :user-agent"'

export const logger_file = morgan(morgan_format, { stream: logger.stream })
export const logger_console = morgan(morgan_format)