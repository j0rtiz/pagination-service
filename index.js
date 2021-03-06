(async function startApplication() {
    const container = require('./src/container');
    const app = container.resolve('application');

    app.start().catch((error) => {
        app.logger.error(error.stack);
        process.exit();
    });
})();
