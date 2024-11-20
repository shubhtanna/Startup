// models/ticket.js
import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved'],
        default: 'Pending'  // Default status is now 'In Progress'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        required: true
    },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
