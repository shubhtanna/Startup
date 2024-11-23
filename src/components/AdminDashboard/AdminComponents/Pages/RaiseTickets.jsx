import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";

const RaiseTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [titleSearch, setTitleSearch] = useState("");
  const [dateSearch, setDateSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all"); // New state for priority filter
  const [expandedTickets, setExpandedTickets] = useState({});

  // Color coding for different priorities
  const priorityColors = {
    low: "#d1f7c4", // Light Green
    medium: "#fff3b0", // Light Yellow
    high: "#ffadad", // Light Red
  };

  // Fetch tickets from the API
  const fetchTickets = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/tickets");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setTickets(data);
      setFilteredTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  // Call the fetchTickets function when the component mounts
  useEffect(() => {
    fetchTickets();
  }, []);

  // Filter tickets based on title, date, and priority
  useEffect(() => {
    const filtered = tickets.filter((ticket) => {
      const matchesTitle = ticket.title.toLowerCase().includes(titleSearch.toLowerCase());
      const matchesDate = ticket.date.includes(dateSearch);
      const matchesPriority =
        priorityFilter === "all" || ticket.priority.toLowerCase() === priorityFilter;

      return matchesTitle && matchesDate && matchesPriority;
    });
    setFilteredTickets(filtered);
  }, [titleSearch, dateSearch, priorityFilter, tickets]);

  // Count tickets by priority
  const countByPriority = (priority) =>
    tickets.filter((ticket) => ticket.priority.toLowerCase() === priority).length;

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const updatedTicket = await response.json();
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === ticketId ? { ...ticket, status: updatedTicket.status } : ticket
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const toggleDescription = (ticketId) => {
    setExpandedTickets((prevExpandedTickets) => ({
      ...prevExpandedTickets,
      [ticketId]: !prevExpandedTickets[ticketId],
    }))
  }

  return (
    <div className="overflow-y-auto max-h-[550px] overflow-hidden">
      {/* Count Feature */}
      <div className="flex flex-wrap md:flex-nowrap md:space-x-3 space-y-3 md:space-y-0 my-3">
        {/* Ticket Counts */}
        <div className="flex justify-between items-center p-4 bg-white shadow rounded w-full md:w-[20%]">
          <div className="flex items-center space-x-1">
            <h3 className="text-lg font-bold text-gray-800">Tickets:</h3>
            <p className="text-xl font-semibold text-gray-800">{tickets.length}</p>
          </div>
        </div>
        {/* Priority Counts */}
        {["low", "medium", "high"].map((priority) => (
          <div
            key={priority}
            className="flex justify-between items-center p-4 bg-white shadow rounded w-full md:w-[20%]"
            style={{ backgroundColor: priorityColors[priority] }}
          >
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-bold text-gray-800">{priority.charAt(0).toUpperCase() + priority.slice(1)}:</h3>
              <p className="text-xl font-semibold text-gray-800">{countByPriority(priority)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Section */}
      <div className="my-6 w-[83%]">
        <div className="grid grid-cols-3 sm:grid-col-1 gap-4">
          {/* Search Inputs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search by Title</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={titleSearch}
              onChange={(e) => setTitleSearch(e.target.value)}
              placeholder="Enter title..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search by Date</label>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={dateSearch}
              onChange={(e) => setDateSearch(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Priority</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Tickets</option>
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Display Filtered Tickets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full md:w-[83%]">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket._id}
            className="p-3 bg-white shadow-md rounded "
            style={{ backgroundColor: priorityColors[ticket.priority.toLowerCase()] }}
          >
            <h3 className="text-lg font-bold">{ticket.title}</h3>
            <p>{ticket.description}</p>
            <p><strong>Created By:</strong> {ticket.createdBy}</p>
            <p><strong>Priority:</strong> {ticket.priority}</p>
            <p><strong>Date:</strong> {format(parseISO(ticket.date), "yyyy-MM-dd")}</p>
            <div className="mt-2">
              <p><strong>Status:</strong></p>
              <select
                value={ticket.status}
                onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                className="p-2 border rounded"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RaiseTickets;