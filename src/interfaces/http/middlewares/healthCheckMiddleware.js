const Status = require('http-status');

module.exports = () => (req, res) => res.status(Status.OK).json({ status: 'UP' });
