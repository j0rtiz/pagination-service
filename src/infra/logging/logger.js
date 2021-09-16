const winston = require('winston');

module.exports = ({ config }) => {
    const { serviceName, shortServiceName, logsPath } = config.application;
    const format = winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        winston.format.printf((msg) => {
            const { level, timestamp, message, stack } = msg;
            let log = typeof message === 'object' ? JSON.stringify(message, null, 2) : message;

            if (stack) {
                log = stack;
            }

            return `[${new Date(timestamp).toLocaleString()}] - [${shortServiceName}] - [${level}]: ${log}`;
        })
    );
    const options = {
        format: winston.format.combine(format, winston.format.json()),
        levels: winston.config.syslog.levels,
        defaultMeta: { service: serviceName },
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(winston.format.timestamp(), winston.format.colorize(), format)
            }),
            new winston.transports.File({ filename: logsPath })
        ]
    };
    const logger = winston.createLogger(options);

    logger.stream = {
        write: (message) => {
            logger.info(message.substring(0, message.lastIndexOf('\n')));
        }
    };
    logger.debug = (error) => {
        const hasConfig = Object.prototype.hasOwnProperty.call(error, 'config');
        let errorData = error;

        if (hasConfig) {
            errorData = {
                request: {
                    method: error.config?.method,
                    url: `${error.config?.baseURL}${error.config?.url}`,
                    data: error.config?.data,
                    headers: error.config?.headers
                },
                error: {
                    status: error.response?.status || 500,
                    message: error.message,
                    details: error.details || error.response?.data
                }
            };
        }

        logger.error(errorData);
    };

    return logger;
};
