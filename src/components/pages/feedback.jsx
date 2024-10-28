// // // import React, { useState, useEffect } from 'react';

// // // function Feed() {
// // //     const [tickets, setTickets] = useState([]);
// // //     const [formData, setFormData] = useState({
// // //         title: '',
// // //         description: '',
// // //         createdBy: '',
// // //         search: '',
// // //         priority: 'Low',
// // //     });
// // //     const [filter, setFilter] = useState({
// // //         status: 'All',
// // //         priority: 'All',
// // //     });

// // //     const fetchTickets = async () => {
// // //         try {
// // //             const response = await fetch('http://localhost:5000/api/tickets');
// // //             if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// // //             const data = await response.json();
// // //             setTickets(data);
// // //         } catch (error) {
// // //             console.error('Error fetching tickets:', error);
// // //         }
// // //     };

// // //     useEffect(() => {
// // //         fetchTickets();
// // //     }, []);

// // //     const handleInputChange = (e) => {
// // //         setFormData({
// // //             ...formData,
// // //             [e.target.name]: e.target.value
// // //         });
// // //     };

// // //     const handleFilterChange = (e) => {
// // //         setFilter({
// // //             ...filter,
// // //             [e.target.name]: e.target.value
// // //         });
// // //     };

// // //     const handleSubmit = async (e) => {
// // //         e.preventDefault();
// // //         try {
// // //             const response = await fetch('http://localhost:5000/api/tickets', {
// // //                 method: 'POST',
// // //                 headers: { 'Content-Type': 'application/json' },
// // //                 body: JSON.stringify(formData),
// // //             });
// // //             if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// // //             const newTicket = await response.json();
// // //             setTickets([...tickets, newTicket]);
// // //             setFormData({
// // //                 title: '',
// // //                 description: '',
// // //                 createdBy: '',
// // //                 search: '',
// // //                 priority: 'Low'
// // //             });
// // //         } catch (error) {
// // //             console.error('Error creating ticket:', error);
// // //         }
// // //     };

// // //     const handleSearch = (query) => {
// // //         const searchQuery = query.toLowerCase().trim();
// // //         if (searchQuery !== '') {
// // //             const searchedTickets = tickets.filter(
// // //                 (ticket) =>
// // //                     ticket.title.toLowerCase().includes(searchQuery) ||
// // //                     ticket.description.toLowerCase().includes(searchQuery) ||
// // //                     ticket.createdBy.toLowerCase().includes(searchQuery)
// // //             );
// // //             setTickets(searchedTickets);
// // //         } else {
// // //             fetchTickets(); // Fetch all tickets if search query is empty
// // //         }
// // //     };

// // //     const handleDelete = async (ticketId) => {
// // //         try {
// // //             const response = await fetch(`http://localhost:5000/api/tickets/${ticketId}`, { method: 'DELETE' });
// // //             if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// // //             setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
// // //         } catch (error) {
// // //             console.error('Error deleting ticket:', error);
// // //         }
// // //     };

// // //     const handlePriorityChange = async (ticketId, newPriority) => {
// // //         try {
// // //             const response = await fetch(`http://localhost:5000/api/tickets/${ticketId}`, {
// // //                 method: 'PATCH',
// // //                 headers: { 'Content-Type': 'application/json' },
// // //                 body: JSON.stringify({ priority: newPriority }),
// // //             });
// // //             if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// // //             const updatedTicket = await response.json();
// // //             setTickets((prevTickets) =>
// // //                 prevTickets.map((ticket) =>
// // //                     ticket._id === ticketId ? { ...ticket, priority: updatedTicket.priority } : ticket
// // //                 )
// // //             );
// // //         } catch (error) {
// // //             console.error('Error updating priority:', error);
// // //         }
// // //     };

// // //     const filteredTickets = tickets.filter((ticket) => {
// // //         const statusFilter = filter.status === 'All' ? true : ticket.status === filter.status;
// // //         const priorityFilter = filter.priority === 'All' ? true : ticket.priority === filter.priority;
// // //         return statusFilter && priorityFilter;
// // //     });

// // //     function getPriorityColor(priority) {
// // //         switch (priority) {
// // //             case 'Low': return 'bg-green-200';
// // //             case 'Medium': return 'bg-yellow-200';
// // //             case 'High': return 'bg-red-200';
// // //             default: return 'bg-white';
// // //         }
// // //     }

// // //     return (
// // //         <div className="App p-6 bg-gray-100 font-ubuntu w-full min-h-screen flex flex-col items-center bg-gradient-to-r from-cyan-500 to-blue-500">
// // //             <h1 className="text-2xl font-bold mb-6 text-center">Ticket Raising Platform</h1>

// // //             <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-md w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
// // //                 <div className="flex flex-col">
// // //                     <label className="font-medium">Title:</label>
// // //                     <input
// // //                         type="text"
// // //                         name="title"
// // //                         value={formData.title}
// // //                         onChange={handleInputChange}
// // //                         className="border rounded px-3 py-2"
// // //                         required
// // //                     />
// // //                 </div>
// // //                 <div className="flex flex-col">
// // //                     <label className="font-medium">Description:</label>
// // //                     <textarea
// // //                         name="description"
// // //                         value={formData.description}
// // //                         onChange={handleInputChange}
// // //                         className="border rounded px-3 py-2"
// // //                         required
// // //                     />
// // //                 </div>
// // //                 <div className="flex flex-col">
// // //                     <label className="font-medium">Created By:</label>
// // //                     <input
// // //                         type="text"
// // //                         name="createdBy"
// // //                         value={formData.createdBy}
// // //                         onChange={handleInputChange}
// // //                         className="border rounded px-3 py-2"
// // //                         required
// // //                     />
// // //                 </div>
// // //                 <div className="flex flex-col">
// // //                     <label className="font-medium">Priority:</label>
// // //                     <select
// // //                         name="priority"
// // //                         value={formData.priority}
// // //                         onChange={handleInputChange}
// // //                         className="border rounded px-3 py-2"
// // //                     >
// // //                         <option value="Low">Low</option>
// // //                         <option value="Medium">Medium</option>
// // //                         <option value="High">High</option>
// // //                     </select>
// // //                 </div>
// // //                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full">Submit</button>
// // //             </form>

// // //             <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl my-6">
// // //                 <h2 className="text-lg font-semibold mb-4">Filters and Search</h2>
// // //                 <div className="flex flex-col gap-2 md:flex-row">
// // //                     <select name="status" value={filter.status} onChange={handleFilterChange} className="border rounded px-2 py-2">
// // //                         <option value="All">All</option>
// // //                         <option value="Open">Open</option>
// // //                         <option value="In Progress">In Progress</option>
// // //                         <option value="Resolved">Resolved</option>
// // //                     </select>
// // //                     <select name="priority" value={filter.priority} onChange={handleFilterChange} className="border rounded px-2 py-2">
// // //                         <option value="All">All</option>
// // //                         <option value="Low">Low</option>
// // //                         <option value="Medium">Medium</option>
// // //                         <option value="High">High</option>
// // //                     </select>
// // //                     <input
// // //                         type="text"
// // //                         name="search"
// // //                         value={formData.search}
// // //                         onChange={(e) => {
// // //                             setFormData({ ...formData, search: e.target.value });
// // //                             handleSearch(e.target.value);
// // //                         }}
// // //                         placeholder="Search tickets"
// // //                         className="border rounded px-1 py-1"
// // //                     />
// // //                 </div>
// // //             </div>

// // //             <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-4xl">
// // //                 {filteredTickets.map((ticket) => (
// // //                     <div key={ticket._id} className={`p-4 rounded-lg shadow-lg ${getPriorityColor(ticket.priority)}`}>
// // //                         <h3 className="font-bold text-lg">{ticket.title}</h3>
// // //                         <p>{ticket.description}</p>
// // //                         <p className="text-sm text-gray-600">Created by: {ticket.createdBy}</p>
// // //                         <div className="mt-2">
// // //                             <label className="font-medium">Update Priority:</label>
// // //                             <select
// // //                                 value={ticket.priority}
// // //                                 onChange={(e) => handlePriorityChange(ticket._id, e.target.value)}
// // //                                 className="border rounded px-2 py-1 ml-2"
// // //                             >
// // //                                 <option value="Low">Low</option>
// // //                                 <option value="Medium">Medium</option>
// // //                                 <option value="High">High</option>
// // //                             </select>
// // //                         </div>
// // //                         <button
// // //                             onClick={() => handleDelete(ticket._id)}
// // //                             className="bg-red-500 text-white px-3 py-1 rounded mt-2"
// // //                         >
// // //                             Delete
// // //                         </button>
// // //                     </div>
// // //                 ))}
// // //             </div>
// // //         </div>
// // //     );
// // // }

// // // export default Feed;


// // import React, { useState, useEffect } from 'react';

// // function Feed() {
// //     const [tickets, setTickets] = useState([]);
// //     const [formData, setFormData] = useState({
// //         title: '',
// //         description: '',
// //         createdBy: '',
// //         search: '',
// //         priority: 'Low',
// //     });
// //     const [filter, setFilter] = useState({
// //         status: 'All',
// //         priority: 'All',
// //     });

// //     const [editingTicketId, setEditingTicketId] = useState(null);

// //     const fetchTickets = async () => {
// //         try {
// //             const response = await fetch('http://localhost:5000/api/tickets');
// //             if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //             const data = await response.json();
// //             setTickets(data);
// //         } catch (error) {
// //             console.error('Error fetching tickets:', error);
// //         }
// //     };

// //     useEffect(() => {
// //         fetchTickets();
// //     }, []);

// //     const handleInputChange = (e) => {
// //         setFormData({
// //             ...formData,
// //             [e.target.name]: e.target.value
// //         });
// //     };

// //     const handleFilterChange = (e) => {
// //         setFilter({
// //             ...filter,
// //             [e.target.name]: e.target.value
// //         });
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const response = await fetch('http://localhost:5000/api/tickets', {
// //                 method: 'POST',
// //                 headers: { 'Content-Type': 'application/json' },
// //                 body: JSON.stringify(formData),
// //             });
// //             if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //             const newTicket = await response.json();
// //             setTickets([...tickets, newTicket]);
// //             setFormData({
// //                 title: '',
// //                 description: '',
// //                 createdBy: '',
// //                 search: '',
// //                 priority: 'Low'
// //             });
// //         } catch (error) {
// //             console.error('Error creating ticket:', error);
// //         }
// //     };

// //     const resetForm = () => {
// //         setFormData({
// //             title: '',
// //             description: '',
// //             createdBy: '',
// //             search: '',
// //             priority: 'Low'
// //         });
// //         setEditingTicketId(null); // Reset editing state
// //     };


// //     const handleSearch = (query) => {
// //         const searchQuery = query.toLowerCase().trim();
// //         if (searchQuery !== '') {
// //             const searchedTickets = tickets.filter(
// //                 (ticket) =>
// //                     ticket.title.toLowerCase().includes(searchQuery) ||
// //                     ticket.description.toLowerCase().includes(searchQuery) ||
// //                     ticket.createdBy.toLowerCase().includes(searchQuery)
// //             );
// //             setTickets(searchedTickets);
// //         } else {
// //             fetchTickets(); // Fetch all tickets if search query is empty
// //         }
// //     };

// //     const handleDelete = async (ticketId) => {
// //         try {
// //             const response = await fetch(`http://localhost:5000/api/tickets/${ticketId}`, { method: 'DELETE' });
// //             if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //             setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
// //         } catch (error) {
// //             console.error('Error deleting ticket:', error);
// //         }
// //     };

// //     const handleEdit = (ticket) => {
// //         setFormData({
// //             title: ticket.title,
// //             description: ticket.description,
// //             createdBy: ticket.createdBy,
// //             priority: ticket.priority,
// //             search: ''
// //         });
// //         setEditingTicketId(ticket._id); // Set the ticket ID for editing
// //     };

// //     const handlePriorityChange = async (ticketId, newPriority) => {
// //         try {
// //             const response = await fetch(`http://localhost:5000/api/tickets/${ticketId}`, {
// //                 method: 'PATCH',
// //                 headers: { 'Content-Type': 'application/json' },
// //                 body: JSON.stringify({ priority: newPriority }),
// //             });
// //             if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //             const updatedTicket = await response.json();
// //             setTickets((prevTickets) =>
// //                 prevTickets.map((ticket) =>
// //                     ticket._id === ticketId ? { ...ticket, priority: updatedTicket.priority } : ticket
// //                 )
// //             );
// //         } catch (error) {
// //             console.error('Error updating priority:', error);
// //         }
// //     };

// //     const createTicket = async () => {
// //         try {
// //             const response = await fetch('http://localhost:5000/api/tickets', {
// //                 method: 'POST',
// //                 headers: { 'Content-Type': 'application/json' },
// //                 body: JSON.stringify(formData),
// //             });
// //             if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //             const newTicket = await response.json();
// //             setTickets([...tickets, newTicket]);
// //             resetForm();
// //         } catch (error) {
// //             console.error('Error creating ticket:', error);
// //         }
// //     };

// //     const updateTicket = async (ticketId) => {
// //         try {
// //             const response = await fetch(`http://localhost:5000/api/tickets/${ticketId}`, {
// //                 method: 'PATCH',
// //                 headers: { 'Content-Type': 'application/json' },
// //                 body: JSON.stringify(formData),
// //             });
// //             if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //             const updatedTicket = await response.json();
// //             setTickets((prevTickets) =>
// //                 prevTickets.map((ticket) =>
// //                     ticket._id === ticketId ? updatedTicket : ticket
// //                 )
// //             );
// //             resetForm();
// //         } catch (error) {
// //             console.error('Error updating ticket:', error);
// //         }
// //     };


// //     const filteredTickets = tickets.filter((ticket) => {
// //         const statusFilter = filter.status === 'All' ? true : ticket.status === filter.status;
// //         const priorityFilter = filter.priority === 'All' ? true : ticket.priority === filter.priority;
// //         return statusFilter && priorityFilter;
// //     });

// //     function getPriorityColor(priority) {
// //         switch (priority) {
// //             case 'Low': return 'bg-green-200';
// //             case 'Medium': return 'bg-yellow-200';
// //             case 'High': return 'bg-red-200';
// //             default: return 'bg-white';
// //         }
// //     }

// //     return (
// //         <div className="App p-6 font-ubuntu w-full min-h-screen flex flex-col items-center bg-gradient-to-r bg-[#a8e7eb] border-slate-800">
// //             {/* <h1 className="text-2xl font-bold mb-6 text-center">Ticket Raising Platform</h1> */}

// //             <form onSubmit={handleSubmit} className="animate-slide-in space-y-4 p-4 bg-white rounded-lg shadow-md w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
// //                 <div className="flex flex-col">
// //                     <label className="font-medium">Title:</label>
// //                     <input
// //                         type="text"
// //                         name="title"
// //                         value={formData.title}
// //                         onChange={handleInputChange}
// //                         className="border rounded px-3 py-2"
// //                         required
// //                     />
// //                 </div>
// //                 <div className="flex flex-col">
// //                     <label className="font-medium">Description:</label>
// //                     <textarea
// //                         name="description"
// //                         value={formData.description}
// //                         onChange={handleInputChange}
// //                         className="border rounded px-3 py-2"
// //                         required
// //                     />
// //                 </div>
// //                 <div className="flex flex-col">
// //                     <label className="font-medium">Created By:</label>
// //                     <input
// //                         type="text"
// //                         name="createdBy"
// //                         value={formData.createdBy}
// //                         onChange={handleInputChange}
// //                         className="border rounded px-3 py-2"
// //                         required
// //                     />
// //                 </div>
// //                 <div className="flex flex-col">
// //                     <label className="font-medium">Priority:</label>
// //                     <select
// //                         name="priority"
// //                         value={formData.priority}
// //                         onChange={handleInputChange}
// //                         className="border rounded px-3 py-2"
// //                     >
// //                         <option value="Low">Low</option>
// //                         <option value="Medium">Medium</option>
// //                         <option value="High">High</option>
// //                     </select>
// //                 </div>
// //                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full">{editingTicketId ? 'Update' : 'Submit'}</button>
// //             </form>

// //             <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl my-6">
// //                 <h2 className="text-lg font-semibold mb-4">Filters and Search</h2>
// //                 <div className="flex flex-col gap-2 md:flex-row">
// //                     <select name="status" value={filter.status} onChange={handleFilterChange} className="border rounded px-2 py-2">
// //                         <option value="All">All</option>
// //                         <option value="Open">Open</option>
// //                         <option value="In Progress">In Progress</option>
// //                         <option value="Resolved">Resolved</option>
// //                     </select>
// //                     <select name="priority" value={filter.priority} onChange={handleFilterChange} className="border rounded px-2 py-2">
// //                         <option value="All">All</option>
// //                         <option value="Low">Low</option>
// //                         <option value="Medium">Medium</option>
// //                         <option value="High">High</option>
// //                     </select>
// //                     <input
// //                         type="text"
// //                         name="search"
// //                         value={formData.search}
// //                         onChange={(e) => {
// //                             setFormData({ ...formData, search: e.target.value });
// //                             handleSearch(e.target.value);
// //                         }}
// //                         placeholder="Search tickets"
// //                         className="border rounded px-1 py-1"
// //                     />
// //                 </div>
// //             </div>
// //             <h1 className="mt-5 text-2xl font-bold mb-6 text-center">All Raise Ticket</h1>
// //             {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-4xl">
// //                 {filteredTickets.map((ticket) => (
// //                     <div key={ticket._id} className={`p-4 rounded-lg shadow-lg ${getPriorityColor(ticket.priority)} animate-fade-in hover:scale-105 transform transition duration-300`}>
// //                         <h3 className="font-bold text-lg">{ticket.title}</h3>
// //                         <p>{ticket.description}</p>
// //                         <p className="text-sm text-gray-600">Created by: {ticket.createdBy}</p>
// //                         <div className="mt-2">
// //                             <label className="font-medium">Update Priority:</label>
// //                             <select
// //                                 value={ticket.priority}
// //                                 onChange={(e) => handlePriorityChange(ticket._id, e.target.value)}
// //                                 className="border rounded px-2 py-1 ml-0"
// //                             >
// //                                 <option value="Low">Low</option>
// //                                 <option value="Medium">Medium</option>
// //                                 <option value="High">High</option>
// //                             </select>
// //                         </div>
// //                         <div className="flex justify-center items-center mr-5">
// //                             <button
// //                                 onClick={() => handleDelete(ticket._id)}
// //                                 className="bg-red-500 text-white px-4 py-2 rounded mt-2"
// //                             >
// //                                 Delete
// //                             </button>
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div> */}
// //             <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
// //                 <h2 className="text-lg font-semibold mb-4">Tickets</h2>
// //                 <ul>
// //                     {filteredTickets.map((ticket) => (
// //                         <li key={ticket._id} className={`flex justify-between items-center mb-2 p-2 border rounded ${getPriorityColor(ticket.priority)}`}>
// //                             <div className="flex flex-col">
// //                                 <strong>{ticket.title}</strong>
// //                                 <span>{ticket.description}</span>
// //                                 <span className="text-sm text-gray-500">Created by: {ticket.createdBy}</span>
// //                             </div>
// //                             <div className="flex items-center">
// //                                 <button onClick={() => handleEdit(ticket)} className="bg-yellow-300 text-black px-2 py-1 rounded mr-2">
// //                                     Edit
// //                                 </button>
// //                                 <button onClick={() => handleDelete(ticket._id)} className="bg-red-500 text-white px-2 py-1 rounded">
// //                                     Delete
// //                                 </button>
// //                             </div>
// //                         </li>
// //                     ))}
// //                 </ul>
// //             </div>
// //         </div>
// //     );
// // }

// // export default Feed;


// import React, { useState, useEffect } from 'react';

// function Feed() {
//     const [tickets, setTickets] = useState([]);
//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         createdBy: '',
//         search: '',
//         priority: 'Low',
//     });
//     const [filter, setFilter] = useState({
//         status: 'All',
//         priority: 'All',
//     });

//     const [editingTicketId, setEditingTicketId] = useState(null);

//     const fetchTickets = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/tickets');
//             if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//             const data = await response.json();
//             setTickets(data);
//         } catch (error) {
//             console.error('Error fetching tickets:', error);
//         }
//     };

//     useEffect(() => {
//         fetchTickets();
//     }, []);

//     const handleInputChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleFilterChange = (e) => {
//         setFilter({
//             ...filter,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (editingTicketId) {
//             await updateTicket(editingTicketId);
//         } else {
//             await createTicket();
//         }
//     };

//     const resetForm = () => {
//         setFormData({
//             title: '',
//             description: '',
//             createdBy: '',
//             search: '',
//             priority: 'Low'
//         });
//         setEditingTicketId(null); // Reset editing state
//     };

//     const handleSearch = (query) => {
//         const searchQuery = query.toLowerCase().trim();
//         if (searchQuery !== '') {
//             const searchedTickets = tickets.filter(
//                 (ticket) =>
//                     ticket.title.toLowerCase().includes(searchQuery) ||
//                     ticket.description.toLowerCase().includes(searchQuery) ||
//                     ticket.createdBy.toLowerCase().includes(searchQuery)
//             );
//             setTickets(searchedTickets);
//         } else {
//             fetchTickets(); // Fetch all tickets if search query is empty
//         }
//     };

//     const handleDelete = async (ticketId) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/tickets/${ticketId}`, { method: 'DELETE' });
//             if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//             setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
//         } catch (error) {
//             console.error('Error deleting ticket:', error);
//         }
//     };

//     const handleEdit = (ticket) => {
//         setFormData({
//             title: ticket.title,
//             description: ticket.description,
//             createdBy: ticket.createdBy,
//             priority: ticket.priority,
//             search: ''
//         });
//         setEditingTicketId(ticket._id); // Set the ticket ID for editing
//     };

//     const handlePriorityChange = async (ticketId, newPriority) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/tickets/${ticketId}`, {
//                 method: 'PATCH',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ priority: newPriority }),
//             });
//             if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//             const updatedTicket = await response.json();
//             setTickets((prevTickets) =>
//                 prevTickets.map((ticket) =>
//                     ticket._id === ticketId ? { ...ticket, priority: updatedTicket.priority } : ticket
//                 )
//             );
//         } catch (error) {
//             console.error('Error updating priority:', error);
//         }
//     };

//     const createTicket = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/tickets', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData),
//             });
//             if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//             const newTicket = await response.json();
//             setTickets([...tickets, newTicket]);
//             resetForm();
//         } catch (error) {
//             console.error('Error creating ticket:', error);
//         }
//     };

//     const updateTicket = async (ticketId) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/tickets/${ticketId}`, {
//                 method: 'PATCH',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData),
//             });
//             if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//             const updatedTicket = await response.json();
//             setTickets((prevTickets) =>
//                 prevTickets.map((ticket) =>
//                     ticket._id === ticketId ? updatedTicket : ticket
//                 )
//             );
//             resetForm();
//         } catch (error) {
//             console.error('Error updating ticket:', error);
//         }
//     };

//     const filteredTickets = tickets.filter((ticket) => {
//         const statusFilter = filter.status === 'All' ? true : ticket.status === filter.status;
//         const priorityFilter = filter.priority === 'All' ? true : ticket.priority === filter.priority;
//         return statusFilter && priorityFilter;
//     });

//     function getPriorityColor(priority) {
//         switch (priority) {
//             case 'Low': return 'bg-green-200';
//             case 'Medium': return 'bg-yellow-200';
//             case 'High': return 'bg-red-200';
//             default: return 'bg-white';
//         }
//     }

//     return (
//         <div className="App p-6 font-ubuntu w-full min-h-screen flex flex-col items-center bg-gradient-to-r bg-[#a8e7eb] border-slate-800">
//             <form onSubmit={handleSubmit} className="animate-slide-in space-y-4 p-4 bg-white rounded-lg shadow-md w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
//                 <div className="flex flex-col">
//                     <label className="font-medium">Title:</label>
//                     <input
//                         type="text"
//                         name="title"
//                         value={formData.title}
//                         onChange={handleInputChange}
//                         className="border rounded px-3 py-2"
//                         required
//                     />
//                 </div>
//                 <div className="flex flex-col">
//                     <label className="font-medium">Description:</label>
//                     <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleInputChange}
//                         className="border rounded px-3 py-2"
//                         required
//                     />
//                 </div>
//                 <div className="flex flex-col">
//                     <label className="font-medium">Created By:</label>
//                     <input
//                         type="text"
//                         name="createdBy"
//                         value={formData.createdBy}
//                         onChange={handleInputChange}
//                         className="border rounded px-3 py-2"
//                         required
//                     />
//                 </div>
//                 <div className="flex flex-col">
//                     <label className="font-medium">Priority:</label>
//                     <select
//                         name="priority"
//                         value={formData.priority}
//                         onChange={handleInputChange}
//                         className="border rounded px-3 py-2"
//                     >
//                         <option value="Low">Low</option>
//                         <option value="Medium">Medium</option>
//                         <option value="High">High</option>
//                     </select>
//                 </div>
//                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full">{editingTicketId ? 'Update' : 'Submit'}</button>
//             </form>

//             <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl my-6">
//                 <h2 className="text-lg font-semibold mb-4">Filters and Search</h2>
//                 <div className="flex flex-col gap-2 md:flex-row">
//                     <select name="status" value={filter.status} onChange={handleFilterChange} className="border rounded px-2 py-2">
//                         <option value="All">All</option>
//                         <option value="Open">Open</option>
//                         <option value="In Progress">In Progress</option>
//                         <option value="Resolved">Resolved</option>
//                     </select>
//                     <select name="priority" value={filter.priority} onChange={handleFilterChange} className="border rounded px-2 py-2">
//                         <option value="All">All</option>
//                         <option value="Low">Low</option>
//                         <option value="Medium">Medium</option>
//                         <option value="High">High</option>
//                     </select>
//                     <input
//                         type="text"
//                         name="search"
//                         value={formData.search}
//                         onChange={(e) => {
//                             setFormData({ ...formData, search: e.target.value });
//                             handleSearch(e.target.value);
//                         }}
//                         placeholder="Search tickets"
//                         className="border rounded px-1 py-1"
//                     />
//                 </div>
//             </div>
//             <h1 className="mt-4 mb-2 text-lg font-semibold">Tickets</h1>
//             <div className="flex flex-col space-y-2 w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
//                 {filteredTickets.map((ticket) => (
//                     <div key={ticket._id} className={`p-4 border rounded shadow-md flex flex-col ${getPriorityColor(ticket.priority)}`}>
//                         <h3 className="font-bold">{ticket.title}</h3>
//                         <p>{ticket.description}</p>
//                         <p>Created By: {ticket.createdBy}</p>
//                         <div className="flex justify-between mt-2">
//                             <div>
//                                 <button onClick={() => handleEdit(ticket)} className="text-blue-500">Edit</button>
//                                 <button onClick={() => handleDelete(ticket._id)} className="text-red-500 ml-2">Delete</button>
//                             </div>
//                             <select
//                                 value={ticket.priority}
//                                 onChange={(e) => handlePriorityChange(ticket._id, e.target.value)}
//                                 className="border rounded px-2 py-1"
//                             >
//                                 <option value="Low">Low</option>
//                                 <option value="Medium">Medium</option>
//                                 <option value="High">High</option>
//                             </select>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Feed;


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
        <div className="App p-6 font-ubuntu w-full min-h-screen flex flex-col items-center bg-gradient-to-r bg-[#a8e7eb] border-slate-800">
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
