import express from 'express';
import Ticket from '../models/ticket.js';
const router = express.Router();

// Route to get all tickets
router.get('/tickets', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Route to get a single ticket by ID
router.get('/tickets/:id', getTicket, (req, res) => {
    res.json(res.ticket);
});

// Route to create a new ticket
router.post('/tickets', async (req, res) => {
    const ticket = new Ticket({
        title: req.body.title,
        description: req.body.description,
        createdBy: req.body.createdBy,
        status: 'In Progress',  // Default status is 'In Progress'
        priority: req.body.priority || 'Low',
        date: req.body.date,    // Include date field in the request body
    });

    try {
        const newTicket = await ticket.save();
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Route to update an existing ticket by ID
router.patch('/tickets/:id', getTicket, async (req, res) => {
    if (req.body.title != null) {
        res.ticket.title = req.body.title;
    }
    if (req.body.description != null) {
        res.ticket.description = req.body.description;
    }
    if (req.body.status != null) {
        res.ticket.status = req.body.status;
    }
    if (req.body.priority != null) {
        res.ticket.priority = req.body.priority;
    }
    if (req.body.date != null) {
        res.ticket.date = req.body.date;  // Update date if provided
    }

    try {
        const updatedTicket = await res.ticket.save();
        res.json(updatedTicket);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Route to delete a ticket by ID
router.delete('/tickets/:id', getTicket, async (req, res) => {
    try {
        await res.ticket.deleteOne();
        res.json({ message: 'Ticket deleted' });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Middleware to retrieve ticket by ID
async function getTicket(req, res, next) {
    let ticket;
    try {
        ticket = await Ticket.findById(req.params.id);
        if (ticket == null) {
            return res.status(404).json({
                message: 'Ticket not found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

    res.ticket = ticket;
    next();
}

export default router;
