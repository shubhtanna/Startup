import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";

const RaiseTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [titleSearch, setTitleSearch] = useState("");
  const [dateSearch, setDateSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all"); // New state for priority filter

  // Color coding for different priorities
  const priorityColors = {
    low: "#d1f7c4",    // Light Green
    medium: "#fff3b0", // Light Yellow
    high: "#ffadad",   // Light Red
  };

  // Fetch tickets from the API
  const fetchTickets = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tickets");
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

  return (
    <div >
      {/* Count Feature */}
      <div className="flex flex-wrap md:flex-nowrap md:space-x-3 space-y-3 md:space-y-0 my-3">
        <div
          className="flex justify-between items-center p-4 bg-white shadow rounded w-full md:w-[20%]"
          style={{ backgroundColor: "#f0f4f8" }}
        >
          <div className="flex items-center space-x-1">
            <h3 className="text-lg font-bold text-gray-800">Tickets :</h3>
            <p className="text-xl font-semibold text-gray-800">{tickets.length}</p>
          </div>
        </div>

        <div
          className="flex justify-between items-center p-4 bg-white shadow rounded w-full md:w-[20%]"
          style={{ backgroundColor: priorityColors.low }}
        >
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-bold text-gray-800">Low :</h3>
            <p className="text-xl font-semibold text-gray-800">{countByPriority("low")}</p>
          </div>
        </div>

        <div
          className="flex justify-between items-center p-4 bg-white shadow rounded w-full md:w-[20%]"
          style={{ backgroundColor: priorityColors.medium }}
        >
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-bold text-gray-800">Medium :</h3>
            <p className="text-xl font-semibold text-gray-800">{countByPriority("medium")}</p>
          </div>
        </div>

        <div
          className="flex justify-between items-center p-4 bg-white shadow rounded w-full md:w-[20%]"
          style={{ backgroundColor: priorityColors.high }}
        >
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-bold text-gray-800">High :</h3>
            <p className="text-xl font-semibold text-gray-800">{countByPriority("high")}</p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="my-6 w-[83%]">
        <div className="grid grid-cols-3 sm:grid-col-1 gap-4">
          {/* Search by Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search by Title
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={titleSearch}
              onChange={(e) => setTitleSearch(e.target.value)}
              placeholder="Enter title..."
            />
          </div>

          {/* Search by Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search by Date
            </label>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={dateSearch}
              onChange={(e) => setDateSearch(e.target.value)}
            />
          </div>

          {/* Filter by Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Priority
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full md:w-[83%] sm:w-[30%]">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket._id}
            className="p-1 bg-white shadow-md rounded"
            style={{ backgroundColor: priorityColors[ticket.priority.toLowerCase()] }}
          >
            <h3 className="text-lg sm:text-xl font-bold">{ticket.title}</h3>
            <p className="text-sm sm:text-base">{ticket.description}</p>
            <p className="text-sm sm:text-base">
              <strong>Created By:</strong> {ticket.createdBy}
            </p>
            <p className="text-sm sm:text-base">
              <strong>Priority:</strong> {ticket.priority}
            </p>
            <p className="text-sm sm:text-base">
              <strong>Date:</strong> {format(parseISO(ticket.date), "yyyy-MM-dd")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RaiseTickets;

