const mongoose = require('mongoose');

const messagesCollection = 'messages';

const messagesScheme = new mongoose.Schema({
    user: String,
    message: String,
})

const messagesModel = mongoose.model(messagesCollection, messagesScheme);

module.exports = messagesModel