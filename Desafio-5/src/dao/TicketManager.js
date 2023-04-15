const ticketModel = require("./models/ticket.model");

class TicketManager {
    constructor() {}

    getTicket(id) {
        return ticketModel.findOne({_id: id});
    }

    addTicket(ticket) {
        return ticketModel.create(ticket);
    }

}

const ticketControl = new TicketManager();

module.exports = ticketControl;