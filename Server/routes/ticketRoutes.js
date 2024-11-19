import express from 'express';
import Ticket from '../models/ticket.js';
import Notification from '../models/NotificationModels.js';
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

router.post('/api/tickets', async (req, res) => {
    try {
        const newTicket = new Ticket(req.body);
        await newTicket.save();

        // Create a notification for the admin
        const notification = new Notification({
            message: `New ticket raised: ${newTicket.title}`,
            read: false,
            createdAt: new Date(),
        });
        await notification.save();

        res.status(201).json(newTicket);
    } catch (error) {
        res.status(500).json({ message: 'Error creating ticket', error });
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

router.delete('tickets/:id', async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) return res.status(404).json({ message: 'Notification not found' });
        res.json({ message: 'Notification deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting notification' });
    }
});

router.get('/notifications', async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
});

// PATCH - Mark Notification as Read
router.patch('/notifications/:id', async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Error updating notification', error });
    }
});

// Update Ticket Status
router.patch('/api/tickets/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Open', 'In Progress', 'Resolved'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
    }

    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (!updatedTicket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.json(updatedTicket);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
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
