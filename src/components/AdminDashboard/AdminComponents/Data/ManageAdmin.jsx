import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaEllipsisV } from "react-icons/fa";

const ManageAdmin = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    accountType: "",
    city: "",
    state: "",
  });

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/v1/auth/all-users");
        if (response.data.success) {
          setUsers(response.data.data);
          setFilteredUsers(response.data.data); // Initialize filtered users
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Helper function to style account type
  const getAccountTypeStyle = (type) => {
    switch (type) {
      case "Individual":
        return "bg-purple-500";
      case "Vendor":
        return "bg-yellow-500";
      case "seller":
        return "bg-blue-500";
      default:
        return "bg-green-500";
    }
  };

  // Calculate counts for user categories
  const totalUsers = filteredUsers.length;
  const vendorCount = filteredUsers.filter((user) => user.accountType === "Vendor").length;
  const individualCount = filteredUsers.filter((user) => user.accountType === "Individual").length;

  // Handle input change in the filter form
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Apply filters
  useEffect(() => {
    const { name, accountType, city, state } = filters;
    const filtered = users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return (
        fullName.includes(name.toLowerCase()) &&
        (!accountType || user.accountType.toLowerCase() === accountType.toLowerCase()) &&
        (!city || user.city.toLowerCase().includes(city.toLowerCase())) &&
        (!state || user.state.toLowerCase().includes(state.toLowerCase()))
      );
    });
    setFilteredUsers(filtered);
  }, [filters, users]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Users</h2>

      {/* Summary Cards */}
      <div className="lg:w-[90%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 sm:w-[100%]">
        <div className="p-4 bg-white shadow-lg rounded-lg text-center border">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-blue-500">{totalUsers}</p>
        </div>
        <div className="p-4 bg-white shadow-lg rounded-lg text-center border">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Vendors</h3>
          <p className="text-3xl font-bold text-yellow-500">{vendorCount}</p>
        </div>
        <div className="p-4 bg-white shadow-lg rounded-lg text-center border">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Individuals</h3>
          <p className="text-3xl font-bold text-purple-500">{individualCount}</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="lg:w-[90%] bg-white shadow-lg rounded-lg p-4 mb-6">
        <h3 className="text-xl font-bold mb-4">Filter Users</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Search by Name"
            className="p-2 border rounded-lg"
            value={filters.name}
            onChange={handleFilterChange}
          />
          <select
            name="accountType"
            className="p-2 border rounded-lg"
            value={filters.accountType}
            onChange={handleFilterChange}
          >
            <option value="">All Account Types</option>
            <option value="Individual">Individual</option>
            <option value="Vendor">Vendor</option>
            <option value="seller">Seller</option>
          </select>
          <input
            type="text"
            name="city"
            placeholder="Search by City"
            className="p-2 border rounded-lg"
            value={filters.city}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="state"
            placeholder="Search by State"
            className="p-2 border rounded-lg"
            value={filters.state}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Table View for Larger Screens */}
      <div className="w-[90%] overflow-x-auto bg-white shadow-lg rounded-lg hidden sm:block">
        <table className="w-auto border-collapse overflow-hidden overflow-y-auto">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-3 py-2 border">#</th>
              <th className="px-3 py-2 border">Name</th>
              <th className="px-3 py-2 border">Email</th>
              <th className="px-3 py-2 border">Account Type</th>
              <th className="px-3 py-2 border">City</th>
              <th className="px-3 py-2 border">State</th>
              <th className="px-3 py-2 border">Address</th>
              <th className="px-3 py-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user._id}
                className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border font-medium">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${getAccountTypeStyle(
                      user.accountType
                    )}`}
                  >
                    {user.accountType}
                  </span>
                </td>
                <td className="px-4 py-2 border">{user.city}</td>
                <td className="px-4 py-2 border">{user.state}</td>
                <td className="px-4 py-2 border">{user.address}</td>
                <td className="px-4 py-2 border text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                      <FaEdit />
                    </button>
                    <button className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAdmin;
