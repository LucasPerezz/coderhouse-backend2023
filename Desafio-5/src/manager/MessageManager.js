const mongoose = require('mongoose')
const messagesModel = require('../models/message.model');

class MessageManager {
    constructor() {}

    async getMessages() {
        const messages = await messagesModel.find();
        return messages;
    }

    async addMessage(message) {
         await messagesModel.create(message);
    }
}

const messageControl = new MessageManager();

module.exports = messageControl;