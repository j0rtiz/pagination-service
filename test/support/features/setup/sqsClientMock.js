const uuidv4 = require('uuid').v4;

module.exports = () => {
    const sqsMessages = [];

    return {
        send: async (message, extraParams = {}) => {
            const data = { MessageBody: message, MessageId: uuidv4(), ...extraParams };

            sqsMessages.push(data);

            return { data };
        },
        getMessages: async () => {
            return sqsMessages;
        }
    };
};
