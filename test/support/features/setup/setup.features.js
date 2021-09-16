const supertest = require('supertest');
const defaults = require('superagent-defaults');

jest.mock('src/infra/integration/queue/sqsClient', () => jest.requireActual('./sqsClientMock'));
jest.mock('src/infra/integration/rest/httpClient', () => jest.requireActual('./httpClientMock'));
jest.mock('src/infra/logging/logger', () => jest.requireActual('./loggerMock'));
jest.mock('ioredis', () => jest.requireActual('ioredis-mock/jest'));

const container = require('src/container');
const server = container.resolve('server');
// const mongoProvider = container.resolve('mongoProvider');
const request = defaults(supertest(server.express));

server.config.env = 'test';

// beforeAll(async () => {
//     await mongoProvider.connect();
// });

// afterAll(async () => {
//     await mongoProvider.mongoose.connection.close();
// });

expect.extend({
    toBeOneOf(received, items) {
        const pass = items.includes(received);
        const message = () => `Expected ${received} to be contained in array [${items}]`;

        if (pass) {
            return { message, pass: true };
        }

        return { message, pass: false };
    }
});

module.exports = { request, container };
