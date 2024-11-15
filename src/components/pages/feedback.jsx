import React, { useState, useEffect } from 'react';
import { FaTicketAlt, FaUserAlt, FaClipboardList, FaPlusCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';

function Feed() {
    const [tickets, setTickets] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        createdBy: '',
        search: '',
        priority: 'Low',
        date: '', // Date field for new ticket
    });

    const [filter, setFilter] = useState({
        status: 'All',
        priority: 'All',
        date: '', // Date filter field
    });

    const [editingTicketId, setEditingTicketId] = useState(null);

    const fetchTickets = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/tickets');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setTickets(data);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFilterChange = (e) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingTicketId) {
            await updateTicket(editingTicketId);
        } else {
            await createTicket();
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            createdBy: '',
            search: '',
            priority: 'Low',
            date: '', // Reset date field
        });
        setEditingTicketId(null);
    };

    const handleDelete = async (ticketId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tickets/${ticketId}`, { method: 'DELETE' });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
        } catch (error) {
            console.error('Error deleting ticket:', error);
        }
    };

    const handleEdit = (ticket) => {
        setFormData({
            title: ticket.title,
            description: ticket.description,
            createdBy: ticket.createdBy,
            priority: ticket.priority,
            search: '',
            date: format(parseISO(ticket.date), 'yyyy-MM-dd'), // Format date for editing
        });
        setEditingTicketId(ticket._id);
    };

    const handlePriorityChange = async (ticketId, newPriority) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tickets/${ticketId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priority: newPriority }),
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const updatedTicket = await response.json();
            setTickets((prevTickets) =>
                prevTickets.map((ticket) =>
                    ticket._id === ticketId ? { ...ticket, priority: updatedTicket.priority } : ticket
                )
            );
        } catch (error) {
            console.error('Error updating priority:', error);
        }
    };

    const createTicket = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/tickets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const newTicket = await response.json();
            setTickets([...tickets, newTicket]);
            resetForm();
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
    };

    const updateTicket = async (ticketId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tickets/${ticketId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const updatedTicket = await response.json();
            setTickets((prevTickets) =>
                prevTickets.map((ticket) =>
                    ticket._id === ticketId ? updatedTicket : ticket
                )
            );
            resetForm();
        } catch (error) {
            console.error('Error updating ticket:', error);
        }
    };

    const filteredTickets = tickets.filter((ticket) => {
        const matchesSearch = ticket.title.toLowerCase().includes(formData.search.toLowerCase());
        const matchesPriority = filter.priority === 'All' || ticket.priority === filter.priority;
        const matchesStatus = filter.status === 'All' || ticket.status === filter.status;
        const matchesDate = filter.date ? format(parseISO(ticket.date), 'yyyy-MM-dd') === filter.date : true;

        return matchesSearch && matchesPriority && matchesStatus && matchesDate;
    });

    return (
        <div className="p-5 min-h-screen bg-[#DCE2DE]">
            <motion.form
                onSubmit={handleSubmit}
                className="mb-5 p-4 bg-white shadow-md rounded"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-xl font-bold mb-4">{editingTicketId ? 'Edit Ticket' : 'Create Ticket'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Title"
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="createdBy"
                        value={formData.createdBy}
                        onChange={handleInputChange}
                        placeholder="Created By"
                        className="p-2 border rounded"
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        className="p-2 border rounded col-span-1 md:col-span-2"
                    ></textarea>
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>

                    {/* Date Picker */}
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                    />
                </div>
                <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                    {editingTicketId ? 'Update Ticket' : 'Create Ticket'}
                </button>
            </motion.form>

            <div className="flex justify-between items-center mb-5">
                <input
                    type="text"
                    name="search"
                    value={formData.search}
                    onChange={handleInputChange}
                    placeholder="Search by title"
                    className="p-2 border rounded w-full md:w-1/3"
                />
                <select
                    name="priority"
                    value={filter.priority}
                    onChange={handleFilterChange}
                    className="p-2 border rounded ml-2"
                >
                    <option value="All">All Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                {/* Date Filter */}
                <input
                    type="date"
                    name="date"
                    value={filter.date}
                    onChange={handleFilterChange}
                    className="p-2 border rounded ml-2"
                />
            </div>

            <div className="grid grid-cols-1 gap-4">
                {filteredTickets.map((ticket) => (
                    <div key={ticket._id} className="p-4 bg-white shadow-md rounded">
                        <h3 className="text-xl font-bold">{ticket.title}</h3>
                        <p>{ticket.description}</p>
                        <p><strong>Created By:</strong> {ticket.createdBy}</p>
                        <p><strong>Priority:</strong> {ticket.priority}</p>
                        <p><strong>Date:</strong> {format(parseISO(ticket.date), 'yyyy-MM-dd')}</p>
                        <button onClick={() => handleEdit(ticket)} className="mr-2 bg-yellow-500 text-white py-1 px-3 rounded">Edit</button>
                        <button onClick={() => handleDelete(ticket._id)} className="bg-red-500 text-white py-1 px-3 rounded">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Feed;
