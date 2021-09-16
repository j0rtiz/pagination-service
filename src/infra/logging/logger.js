const WinstonGraylog2 = require('winston-graylog2');
const winston = require('winston');
const cycle = require('cycle');

/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('config')} ctx.config
 */
module.exports = ({ config }) => {
    const defaultMessageFormat = winston.format.printf((msg) => {
        const { level, timestamp, message, stack } = msg;
        let log =
            typeof message === 'object' ? JSON.stringify(msg.message, null, 2) : message || msg[Symbol.for('message')];

        if (stack) {
            log = stack;
        }

        return `${timestamp} / [${config.application.shortServiceName}] ${level}: ${log}`;
    });

    const appFormat = winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        defaultMessageFormat
    );

    const grayLogOptions = {
        name: 'Graylog',
        level: 'debug',
        handlerExeption: true,
        format: winston.format.combine(
            winston.format((info) => cycle.decycle(info))(),
            winston.format.json(),
            winston.format.errors({ stack: true }),
            winston.format.metadata(),
            winston.format((info) => {
                const { message, metadata } = info;

                if (!message) {
                    info.message = '';
                }

                if (typeof message === 'object') {
                    if (!message.error) {
                        info.metadata = { ...metadata, ...message };
                    }

                    try {
                        info.message = JSON.stringify(message);
                    } catch {
                        info.message = '';
                    }
                }

                if (metadata.config) {
                    const { url, method, baseURL } = metadata.config;

                    info.metadata = { url, method };

                    if (baseURL) {
                        metadata.baseUrl = baseURL;
                    }
                }

                const { service, timestamp, stack } = metadata;

                info.metadata = { ...info.metadata, service, timestamp, stack };

                return info;
            })()
        ),
        graylog: {
            servers: [{ host: config.integration.graylog.host, port: config.integration.graylog.port }],
            hostname: config.integration.graylog.hostname,
            bufferSize: 1400
        }
    };

    const options = {
        levels: winston.config.syslog.levels,
        format: winston.format.combine(appFormat, winston.format.json()),
        defaultMeta: { service: config.application.serviceName },
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(winston.format.timestamp(), winston.format.colorize(), appFormat)
            }),
            new winston.transports.File({ filename: config.application.logsPath }),
            new WinstonGraylog2(grayLogOptions)
        ]
    };

    const logger = winston.createLogger(options);

    logger.stream = {
        write: function (message) {
            logger.info(message.substring(0, message.lastIndexOf('\n')));
        }
    };

    logger.debugHttpClientError = (error) => {
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
