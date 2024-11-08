import React, { useState, useEffect } from 'react';


function Feed() {
    const [tickets, setTickets] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        createdBy: '',
        search: '',
        priority: 'Low',
    });
    

    const [filter, setFilter] = useState({
        status: 'All',
        priority: 'All',
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
            priority: 'Low'
        });
        setEditingTicketId(null);
    };

    const handleSearch = (query) => {
        const searchQuery = query.toLowerCase().trim();
        if (searchQuery !== '') {
            const searchedTickets = tickets.filter(
                (ticket) =>
                    ticket.title.toLowerCase().includes(searchQuery) ||
                    ticket.description.toLowerCase().includes(searchQuery) ||
                    ticket.createdBy.toLowerCase().includes(searchQuery)
            );
            setTickets(searchedTickets);
        } else {
            fetchTickets();
        }
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
            search: ''
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
            console.log("Updating ticket:", ticketId, "with data:", formData);
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
        const statusFilter = filter.status === 'All' ? true : ticket.status === filter.status;
        const priorityFilter = filter.priority === 'All' ? true : ticket.priority === filter.priority;
        return statusFilter && priorityFilter;
    });

    function getPriorityColor(priority) {
        switch (priority) {
            case 'Low': return 'bg-green-200';
            case 'Medium': return 'bg-yellow-200';
            case 'High': return 'bg-red-200';
            default: return 'bg-white';
        }
    }

    return (
        <div className="App p-6 font-ubuntu w-full min-h-screen flex flex-col items-center bg-gradient-to-r bg-[#3acad4] border-slate-800 ">
            <form onSubmit={handleSubmit} className="animate-slide-in space-y-4 p-6 bg-white rounded-lg shadow-md w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                <div className="flex flex-col">
                    <label className="font-medium">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="border rounded px-3 py-2"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-medium">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="border rounded px-3 py-2"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-medium">Created By:</label>
                    <input
                        type="text"
                        name="createdBy"
                        value={formData.createdBy}
                        onChange={handleInputChange}
                        className="border rounded px-3 py-2"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-medium">Priority:</label>
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="border rounded px-3 py-2"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div className="flex justify-end mt-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        {editingTicketId ? 'Update' : 'Submit'}
                    </button>
                </div>
            </form>
            <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mt-6">
                <h2 className=" flex items-center justify-center text-2xl font-semibold ">All Tickets</h2>
                <br />
                {/* <div className="space-y-5 ">
                    {filteredTickets.map(ticket => (
                        <div key={ticket._id} className={`p-4 border rounded ${getPriorityColor(ticket.priority)}`}>
                            <h3 className="font-bold">{ticket.title}</h3>
                            <p>{ticket.description}</p>
                            <p><strong>Created By:</strong> {ticket.createdBy}</p>
                            <div className="flex justify-between mt-2">
                                <button onClick={() => handleEdit(ticket)} className="bg-yellow-300 px-2 py-1 rounded">Edit</button>
                                <button onClick={() => handleDelete(ticket._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </div>
                        </div>
                    ))}
                </div> */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredTickets.map(ticket => (
                        <div key={ticket._id} className={`p-4 border rounded ${getPriorityColor(ticket.priority)}`}>
                            <h3 className="font-bold">{ticket.title}</h3>
                            <p>{ticket.description}</p>
                            <p><strong>Created By:</strong> {ticket.createdBy}</p>
                            <div className="flex justify-between mt-2">
                                <button onClick={() => handleEdit(ticket)} className="bg-yellow-300 px-2 py-1 rounded">Edit</button>
                                <button onClick={() => handleDelete(ticket._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Feed;
