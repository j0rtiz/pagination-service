const { request } = require('test/support/features/setup/setup.features');
const Status = require('http-status');

describe('HealthCheck', () => {
    describe('#Success', () => {
        it('Should be successfully called', async () => {
            const response = await request.post('/api/healthcheck').send();

            expect(response.status).toBe(Status.OK);
        });
    });

    describe('#Error', () => {
        it('Should be called and return an error', async () => {
            const response = await request.post('/healthcheck').send();

            expect(response.status).toBe(Status.NOT_FOUND);
        });
    });
});
