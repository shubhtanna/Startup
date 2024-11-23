import React, { useState, useEffect } from 'react';
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
        date: '',
        status: 'pending',
    });

    const [filter, setFilter] = useState({
        status: 'All',
        priority: 'All',
        date: '',
    });

    const [editingTicketId, setEditingTicketId] = useState(null);
    const [expandedTickets, setExpandedTickets] = useState({});

    // Fetch tickets from the server
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

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'description' && value.length > 100) {
            alert('Description should not exceed 100 characters.');
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Reset form data
    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            createdBy: '',
            search: '',
            priority: 'Low',
            date: '',
            status: 'pending',
        });
        setEditingTicketId(null);
    };

    // Handle ticket creation or update
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingTicketId) {
            await updateTicket(editingTicketId);
        } else {
            await createTicket();
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
            setTickets((prev) => [...prev, newTicket]);
            resetForm();
            alert('Ticket created successfully!');
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
            setTickets((prev) =>
                prev.map((ticket) =>
                    ticket._id === ticketId ? updatedTicket : ticket
                )
            );
            resetForm();
        } catch (error) {
            console.error('Error updating ticket:', error);
        }
    };

    const handleEdit = (ticket) => {
        setFormData({
            title: ticket.title,
            description: ticket.description,
            createdBy: ticket.createdBy,
            priority: ticket.priority,
            search: '',
            date: format(parseISO(ticket.date), 'yyyy-MM-dd'),
            status: ticket.status,
        });
        setEditingTicketId(ticket._id);
    };

    const handleDelete = async (ticketId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tickets/${ticketId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            setTickets((prev) => prev.filter((ticket) => ticket._id !== ticketId));
        } catch (error) {
            console.error('Error deleting ticket:', error);
        }
    };

    const toggleDescription = (ticketId) => {
        setExpandedTickets((prev) => ({
            ...prev,
            [ticketId]: !prev[ticketId],
        }));
    };

    // Apply filters to tickets
    const filteredTickets = tickets.filter((ticket) => {
        const matchesSearch = ticket.title.toLowerCase().includes(formData.search.toLowerCase());
        const matchesPriority = filter.priority === 'All' || ticket.priority === filter.priority;
        const matchesStatus = filter.status === 'All' || ticket.status === filter.status;
        const matchesDate = filter.date
            ? format(parseISO(ticket.date), 'yyyy-MM-dd') === filter.date
            : true;

        return matchesSearch && matchesPriority && matchesStatus && matchesDate;
    });

    return (
        <div className="p-5 min-h-screen bg-[#DCE2DE]">
            {/* Form */}
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
                        className="p-2 border rounded col-span-1 md:col-span-2 w-full h-32"
                        
                    />
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

            {/* Filters */}
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
                <input
                    type="date"
                    name="date"
                    value={filter.date}
                    onChange={handleFilterChange}
                    className="p-2 border rounded ml-2"
                />
            </div>

            

            {/* Tickets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTickets.map((ticket) => {
                    const isExpanded = expandedTickets[ticket._id];
                    return (
                        <motion.div
                            key={ticket._id}
                            className="bg-white shadow-md rounded p-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-lg font-bold">{ticket.title}</h3>
                            <p className="text-gray-600">
                                Created by: <span className="font-semibold">{ticket.createdBy}</span>
                            </p>
                            <p className="text-gray-600">
                                Priority: <span className="font-semibold">{ticket.priority}</span>
                            </p>
                            <p className="text-gray-600">
                                Date: <span className="font-semibold">{format(parseISO(ticket.date), 'MMM dd, yyyy')}</span>
                            </p>
                            <p className="text-gray-600">
                                Status: <span className="font-semibold">{ticket.status}</span>
                            </p>
                            {isExpanded && <p className="mt-2">{ticket.description}</p>}
                            <div className="mt-3 flex justify-between">
                                <button
                                    onClick={() => toggleDescription(ticket._id)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                >
                                    {isExpanded ? 'Collapse' : 'Expand'}
                                </button>
                                <button
                                    onClick={() => handleEdit(ticket)}
                                    className="bg-green-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(ticket._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

export default Feed;
