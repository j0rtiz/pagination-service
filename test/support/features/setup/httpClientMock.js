const axios = require('axios');

module.exports = () => {
    return ({ baseURL = '', timeout = 3000 }) => axios.create({ baseURL, timeout });
};
