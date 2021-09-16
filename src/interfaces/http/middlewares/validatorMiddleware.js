/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/infra/error/exception')} ctx.exception
 */
module.exports = ({ exception }) => {
    return (schema) => (req, res, next) => {
        try {
            const { error, value } = validate(req, schema);

            if (error) {
                error.details = wrapperError(error.details);

                throw exception.contract(error);
            }

            filterReceivedBody(req, value);

            next();
        } catch (err) {
            next(err);
        }
    };
};

function validate(req, schema) {
    const options = {
        abortEarly: false,
        stripUnknown: true,
        allowUnknown: false
    };

    return schema.validate(req, options);
}

function wrapperError(error) {
    return error.map(({ message, path }) => ({ message, path: path.join('.') }));
}

function filterReceivedBody(req, value) {
    req.body = value.body;
}
