import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { 
  FaSearch, FaFilter, FaCalendarAlt, FaExclamationCircle, 
  FaCheckCircle, FaEdit, FaTrash, FaPlus, FaMinus, 
  FaArrowLeft, FaRecycle, FaTicketAlt
} from 'react-icons/fa';

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
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    // Fetch tickets from the server
    const fetchTickets = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/tickets');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setTickets(data);
        } catch (error) {
            console.error('Error fetching tickets:', error);
            showNotification('Failed to load tickets. Please try again.', 'error');
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' });
        }, 3000);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'description' && value.length > 500) {
            setFormErrors({...formErrors, description: 'Description should not exceed 500 characters.'});
            return;
        } else if (name === 'description') {
            setFormErrors({...formErrors, description: null});
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
        setFormErrors({});
        setEditingTicketId(null);
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.title) errors.title = 'Title is required';
        if (!formData.description) errors.description = 'Description is required';
        if (!formData.createdBy) errors.createdBy = 'Creator name is required';
        if (!formData.date) errors.date = 'Date is required';
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle ticket creation or update
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        try {
            if (editingTicketId) {
                await updateTicket(editingTicketId);
                showNotification('Ticket updated successfully!', 'success');
            } else {
                await createTicket();
                showNotification('Ticket created successfully!', 'success');
            }
            setIsFormVisible(false);
        } catch (error) {
            showNotification('An error occurred. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
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
        } catch (error) {
            console.error('Error creating ticket:', error);
            throw error;
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
            throw error;
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
        setIsFormVisible(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (ticketId) => {
        if (!window.confirm('Are you sure you want to delete this ticket?')) return;
        
        try {
            const response = await fetch(`http://localhost:5000/api/tickets/${ticketId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            setTickets((prev) => prev.filter((ticket) => ticket._id !== ticketId));
            showNotification('Ticket deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting ticket:', error);
            showNotification('Failed to delete ticket. Please try again.', 'error');
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

    // Priority color mapping
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-800';
            case 'Medium': return 'bg-yellow-100 text-yellow-800';
            case 'Low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Status color mapping
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Notification */}
            <AnimatePresence>
                {notification.show && (
                    <motion.div 
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
                            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                        } text-white flex items-center space-x-2`}
                    >
                        {notification.type === 'success' ? (
                            <FaCheckCircle className="text-xl" />
                        ) : (
                            <FaExclamationCircle className="text-xl" />
                        )}
                        <span>{notification.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <header className="bg-[#174B3A] text-white py-8 px-6 shadow-md">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold flex items-center">
                                <FaTicketAlt className="mr-3" />
                                Issue Ticket System
                            </h1>
                            <p className="mt-2 text-green-200">Report issues or request support for E-Waste Trade Hub</p>
                        </div>
                        <button
                            onClick={() => {
                                setIsFormVisible(!isFormVisible);
                                if (!isFormVisible) resetForm();
                            }}
                            className="bg-white text-[#174B3A] px-4 py-2 rounded-lg shadow hover:bg-green-50 transition-colors flex items-center"
                        >
                            {isFormVisible ? (
                                <>
                                    <FaArrowLeft className="mr-2" />
                                    Close Form
                                </>
                            ) : (
                                <>
                                    <FaPlus className="mr-2" />
                                    New Ticket
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {/* Form Section */}
                <AnimatePresence>
                    {isFormVisible && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                                <div className="p-1 bg-gradient-to-r from-[#174B3A] via-[#2d8f6c] to-[#174B3A]"></div>
                                <form onSubmit={handleSubmit} className="p-6">
                                    <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                                        <FaRecycle className="mr-2 text-[#174B3A]" />
                                        {editingTicketId ? 'Update Ticket' : 'Create New Ticket'}
                                    </h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                placeholder="Enter ticket title"
                                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#174B3A] focus:border-transparent transition-all ${
                                                    formErrors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                                }`}
                                            />
                                            {formErrors.title && (
                                                <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Created By</label>
                                            <input
                                                type="text"
                                                name="createdBy"
                                                value={formData.createdBy}
                                                onChange={handleInputChange}
                                                placeholder="Your name"
                                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#174B3A] focus:border-transparent transition-all ${
                                                    formErrors.createdBy ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                                }`}
                                            />
                                            {formErrors.createdBy && (
                                                <p className="mt-1 text-sm text-red-600">{formErrors.createdBy}</p>
                                            )}
                                        </div>
                                        
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                placeholder="Describe the issue in detail"
                                                rows="4"
                                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#174B3A] focus:border-transparent transition-all ${
                                                    formErrors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                                }`}
                                            />
                                            <div className="flex justify-between mt-1">
                                                {formErrors.description ? (
                                                    <p className="text-sm text-red-600">{formErrors.description}</p>
                                                ) : (
                                                    <p className="text-xs text-gray-500">
                                                        {formData.description.length}/500 characters
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                            <select
                                                name="priority"
                                                value={formData.priority}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#174B3A] focus:border-transparent bg-white"
                                            >
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                            </select>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                            <input
                                                type="date"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleInputChange}
                                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#174B3A] focus:border-transparent transition-all ${
                                                    formErrors.date ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                                }`}
                                            />
                                            {formErrors.date && (
                                                <p className="mt-1 text-sm text-red-600">{formErrors.date}</p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="mt-6 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                resetForm();
                                                setIsFormVisible(false);
                                            }}
                                            className="mr-3 px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`px-5 py-2.5 bg-[#174B3A] hover:bg-[#0d3c2e] text-white rounded-lg transition-colors flex items-center ${
                                                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                            }`}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    {editingTicketId ? 'Update Ticket' : 'Submit Ticket'}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Filters Section */}
                <div className="bg-white rounded-xl shadow-md p-5 mb-8">
                    <h3 className="font-medium text-gray-700 mb-4 flex items-center">
                        <FaFilter className="mr-2 text-[#174B3A]" />
                        Filter Tickets
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="search"
                                value={formData.search}
                                onChange={handleInputChange}
                                placeholder="Search by title"
                                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#174B3A] focus:border-transparent"
                            />
                        </div>
                        
                        <div>
                            <select
                                name="priority"
                                value={filter.priority}
                                onChange={handleFilterChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#174B3A] focus:border-transparent bg-white"
                            >
                                <option value="All">All Priorities</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        
                        <div>
                            <select
                                name="status"
                                value={filter.status}
                                onChange={handleFilterChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#174B3A] focus:border-transparent bg-white"
                            >
                                <option value="All">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaCalendarAlt className="text-gray-400" />
                            </div>
                            <input
                                type="date"
                                name="date"
                                value={filter.date}
                                onChange={handleFilterChange}
                                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#174B3A] focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Tickets List */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                        {filteredTickets.length} {filteredTickets.length === 1 ? 'Ticket' : 'Tickets'} Found
                    </h3>
                    
                    {filteredTickets.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-md p-8 text-center">
                            <div className="flex justify-center mb-4">
                                <FaTicketAlt className="text-5xl text-gray-300" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-700 mb-2">No tickets found</h3>
                            <p className="text-gray-500 mb-6">
                                {formData.search || filter.priority !== 'All' || filter.status !== 'All' || filter.date 
                                    ? 'Try adjusting your filters to see more results.'
                                    : 'Create your first ticket to get started.'}
                            </p>
                            {!isFormVisible && (
                                <button
                                    onClick={() => setIsFormVisible(true)}
                                    className="inline-flex items-center px-4 py-2 bg-[#174B3A] hover:bg-[#0d3c2e] text-white rounded-lg transition-colors"
                                >
                                    <FaPlus className="mr-2" />
                                    Create Ticket
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTickets.map((ticket) => (
                                <motion.div
                                    key={ticket._id}
                                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className="p-5">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-lg font-bold text-gray-800 mr-2">{ticket.title}</h3>
                                            <div className="flex space-x-1">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                                                    {ticket.priority}
                                                </span>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                                                    {ticket.status === 'completed' ? 'Completed' : 'Pending'}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="mb-4">
                                            <p className="text-sm text-gray-600 mb-1">
                                                <span className="font-medium">Created by:</span> {ticket.createdBy}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">Date:</span> {format(parseISO(ticket.date), 'MMM dd, yyyy')}
                                            </p>
                                        </div>
                                        
                                        <AnimatePresence>
                                            {expandedTickets[ticket._id] && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="mb-4"
                                                >
                                                    <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                                                        {ticket.description || 'No description provided.'}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                        
                                        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
                                            <button
                                                onClick={() => toggleDescription(ticket._id)}
                                                className="text-[#174B3A] hover:text-[#0d3c2e] text-sm font-medium flex items-center transition-colors"
                                            >
                                                {expandedTickets[ticket._id] ? (
                                                    <>
                                                        <FaMinus className="mr-1" />
                                                        Hide Details
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaPlus className="mr-1" />
                                                        View Details
                                                    </>
                                                )}
                                            </button>
                                            
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEdit(ticket)}
                                                    className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                                                    aria-label="Edit ticket"
                                                    title="Edit ticket"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(ticket._id)}
                                                    className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                                    aria-label="Delete ticket"
                                                    title="Delete ticket"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold flex items-center">
                            <FaRecycle className="mr-2" />
                            E-Waste Trade Hub
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                            Transforming electronic waste management for a sustainable future.
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">
                            &copy; {new Date().getFullYear()} E-Waste Trade Hub. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Feed;