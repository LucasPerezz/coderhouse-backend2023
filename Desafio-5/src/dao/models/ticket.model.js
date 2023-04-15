const mongoose = require('mongoose');

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
    code: String,
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: Number,
    purchaser: String
})

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

module.exports = ticketModel;