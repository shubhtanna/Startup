import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/v1/auth/all-users"); // Adjust the endpoint if necessary
                if (response.data.success) {
                    setUsers(response.data.data); // Set the users in state
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);
    return (
        <div className="flex justify-center ">
            <div className="overflow-hidden w-full relative transition duration-300  ">
                {/* Scrolling Wrapper */}
                <div className="flex space-x-11 px-4 sm:px-8 animate-infinite-scroll">
                    {users
                        .filter((user) => user.accountType !== "admin") // Filter out admins
                        .map((user) => (
                            <div
                                key={user._id} // Use _id from MongoDB
                                className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md p-4 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg active:translate-y-2 active:shadow-md"
                            >
                                <img
                                    src={user?.image || "https://via.placeholder.com/150"}
                                    alt={`profile-${user.firstName} ${user.lastName}`}
                                    className="w-24 h-24 rounded-full mx-auto mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 text-center">
                                    {`${user.firstName} ${user.lastName}`}
                                </h3>
                                <p className="text-gray-600 text-center">{user?.accountType}</p>
                                <p className="text-gray-500 text-center">
                                    {user?.city}, {user?.state}
                                </p>
                                <p className="text-gray-400 text-center text-sm mt-2">
                                    {user?.address}
                                </p>
                                <p className="text-gray-500 mt-2 text-sm text-center">
                                    {user?.description}
                                </p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
export default Users
