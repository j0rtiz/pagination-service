const awilix = require('awilix');
const container = awilix.createContainer();

const Config = require('config');
const Application = require('src/app/application');
const Exception = require('src/infra/error/exception');
const Logger = require('src/infra/logging/logger');
const Router = require('src/interfaces/http/router');
const Server = require('src/interfaces/http/Server');

container
    .register({
        config: awilix.asValue(Config),
        application: awilix.asClass(Application).singleton(),
        logger: awilix.asFunction(Logger).singleton(),
        router: awilix.asFunction(Router).singleton(),
        server: awilix.asClass(Server).singleton(),
        exception: awilix.asFunction(Exception),
        container: awilix.asValue(container)
    })
    .loadModules(
        [
            'src/app/operations/**/*.js',
            'src/app/services/**/*.js',
            'src/app/strategies/**/*.js',
            'src/domain/enum/**/*.js',
            'src/domain/factories/**/*.js',
            'src/domain/schemas/**/*.js',
            'src/infra/error/**/*.js',
            'src/infra/integration/**/*.js',
            'src/infra/logging/**/*.js',
            'src/interfaces/http/constants/**/*.js',
            'src/interfaces/http/controllers/**/*.js',
            'src/interfaces/http/middlewares/**/*.js',
            'src/interfaces/http/schemas/**/*.js'
        ],
        {
            formatName: 'camelCase',
            resolverOptions: {
                injectionMode: awilix.InjectionMode.PROXY
            }
        }
    );

module.exports = container;
