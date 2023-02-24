const mongoose = require('mongoose')
const messagesModel = require('../models/message.model');

class MessageManager{

    constructor(){}

    getMessages(){
        return messagesModel.find();
    }

    async addMessage(messageToAdd){

        return messagesModel.create(messageToAdd);
    }
}

const messageControl = new MessageManager();

module.exports = messageControl;