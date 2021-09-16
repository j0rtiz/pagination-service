module.exports = () => (req, res, next) => {
    req.rawBody = '';

    req.on('data', (chunk) => {
        req.rawBody = `${req.rawBody}${chunk}`;
    });

    req.on('end', () => {
        if (req.rawBody !== '') {
            try {
                req.body = JSON.parse(req.rawBody);
            } catch {
                req.rawBodyError = error.message;
            }
        }

        next();
    });
};
