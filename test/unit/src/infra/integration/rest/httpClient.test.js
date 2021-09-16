const httpClient = require('src/infra/integration/rest/httpClient')();
const axios = require('axios');

jest.mock('axios');

describe('infra :: integration :: rest :: httpClient', () => {
    it('Should call the http client with config', async () => {
        const data = { baseURL: 'baseURL', timeout: 1000 };

        httpClient(data);

        expect(axios.create).toHaveBeenCalledWith({ baseURL: data.baseURL, timeout: data.timeout });
    });

    it('Should call the http client without config', async () => {
        httpClient({});

        expect(axios.create).toHaveBeenCalledWith({ baseURL: '', timeout: 3000 });
    });
});
