const { NotFound, MakeErrorClass } = require('fejl');

class Business extends MakeErrorClass('Business') {}
class Contract extends MakeErrorClass('Contract') {}
class Integration extends MakeErrorClass('Integration') {}
class Operation extends MakeErrorClass('Operation') {}
class Database extends MakeErrorClass('Database') {}

module.exports = ({ exceptionEnum }) => ({
    [exceptionEnum.BUSINESS]: (error, errorType) => {
        if (!(error instanceof Error)) {
            error = new Business(error);
        }

        error.errorType = errorType || exceptionEnum.BUSINESS;
        error.statusCode = 422;

        return error;
    },
    [exceptionEnum.CONTRACT]: ({ error, errorType, details = [] }) => {
        if (!(error instanceof Error)) {
            error = new Contract(error);
        }

        error.errorType = errorType || exceptionEnum.CONTRACT;
        error.details = details;
        error.statusCode = 400;

        return error;
    },
    [exceptionEnum.INTEGRATION]: (error, errorType) => {
        if (!(error instanceof Error)) {
            error = new Integration(error);
        }

        error.errorType = errorType || exceptionEnum.INTEGRATION;

        return error;
    },
    [exceptionEnum.OPERATION]: (error, errorType) => {
        if (!(error instanceof Error)) {
            error = new Operation(error);
        }

        error.errorType = errorType || exceptionEnum.OPERATION;

        return error;
    },
    [exceptionEnum.DATABASE]: (error, errorType) => {
        if (!(error instanceof Error)) {
            error = new Database(error);
        }

        error.errorType = errorType || exceptionEnum.DATABASE;

        return error;
    },
    [exceptionEnum.NOT_FOUND]: (error, errorType) => {
        if (!(error instanceof Error)) {
            error = new NotFound(error);
        }

        error.errorType = errorType || exceptionEnum.NOT_FOUND;
        error.statusCode = errorType || exceptionEnum.NOT_FOUND;

        return error;
    }
});
