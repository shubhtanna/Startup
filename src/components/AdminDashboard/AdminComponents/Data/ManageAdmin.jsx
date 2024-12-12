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
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Modal state
  const [selectedUser, setSelectedUser] = useState(null); // Track the user to be "logged out"

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

  // Handle delete icon click
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowConfirmModal(true); // Show confirmation modal
  };

  // Handle confirmation of logout
  const handleConfirmLogout = async () => {
    try {
      const response = await axios.post('/api/v1/auth/deleteaccount', {
        userId: selectedUser._id, // Send the selected user's ID
      });
  
      if (response.data.success) {
        console.log(`User ${selectedUser.email} Deleted successfully.`);
        alert(`User ${selectedUser.email} has been Deleted.`);
        setShowConfirmModal(false);
        setSelectedUser(null);
      } else {
        console.error('Failed to Delete user:', response.data.message);
        alert('Failed to Delete the user. Please try again.');
      }
    } catch (error) {
      console.error('Error Deletiing user Account:', error);
      alert('An error occurred while trying to Delete the user.');
    }
  };

  // Handle cancel action in the modal
  const handleCancel = () => {
    setShowConfirmModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="max-h-screen p-6 bg-gray-100">
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to Delete{" "}
              <span className="font-medium text-blue-500">
                {selectedUser.firstName} {selectedUser.lastName}
              </span>
              ?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={handleConfirmLogout}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

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
      <div className="max-h-[290px] overflow-y-auto overflow-hidden w-[90%] overflow-x-auto bg-white shadow-lg rounded-lg hidden sm:block">
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
                <td className={`px-4 py-2 border text-white ${getAccountTypeStyle(user.accountType)}`}>
                  {user.accountType}
                </td>
                <td className="px-4 py-2 border">{user.city}</td>
                <td className="px-4 py-2 border">{user.state}</td>
                <td className="px-4 py-2 border">{user.address}</td>
                <td className="px-4 py-2 border text-center">
                  <div className="flex justify-center items-center space-x-4">
                    <FaEdit className="text-blue-500 cursor-pointer" />
                    <FaTrashAlt
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDeleteClick(user)} // Trigger confirmation modal
                    />
                    <FaEllipsisV className="cursor-pointer" />
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