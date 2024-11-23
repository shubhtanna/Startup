import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BellIcon, CheckCircleIcon, InboxIcon } from '@heroicons/react/24/solid';

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [filteredNotifications, setFilteredNotifications] = useState([]);
    const [filter, setFilter] = useState("all"); // 'all', 'read', 'unread'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Random Colors for Counters
    const [counterColors, setCounterColors] = useState({
        total: generateRandomColor(),
        read: generateRandomColor(),
        unread: generateRandomColor(),
    });

    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        applyFilter();
    }, [filter, notifications]);

    // Utility: Generate Random Color
    function generateRandomColor() {
        const colors = [
            "#FF6F61",
            "#6B5B95",
            "#88B04B",
            "#F7CAC9",
            "#92A8D1",
            "#FFB347",
            "#B565A7",
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Fetch Notifications from API
    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/api/tickets");
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            setError("Failed to fetch notifications. Please try again.");
            toast.error("Error fetching notifications.");
        } finally {
            setLoading(false);
        }
    };

    // Apply Filters
    const applyFilter = () => {
        if (filter === "all") {
            setFilteredNotifications(notifications);
        } else if (filter === "read") {
            setFilteredNotifications(
                notifications.filter((notification) => notification.read)
            );
        } else if (filter === "unread") {
            setFilteredNotifications(
                notifications.filter((notification) => !notification.read)
            );
        }
    };

    // Mark a Notification as Read
    const markAsRead = async (ticketId) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/tickets/${ticketId}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                }
            );
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            setNotifications(
                notifications.map((notification) =>
                    notification._id === ticketId
                        ? { ...notification, read: true }
                        : notification
                )
            );
            toast.success("Notification marked as read!");
        } catch (error) {
            toast.error("Error marking notification as read.");
        }
    };

    // Delete a Notification with Confirmation
    const deleteNotification = async (ticketId) => {
        if (!window.confirm("Are you sure you want to delete this notification?")) {
            return;
        }
        try {
            setNotifications(
                notifications.filter((notification) => notification._id !== ticketId)
            );
            const response = await fetch(
                `http://localhost:5000/api/tickets/${ticketId}`,
                { method: "DELETE" }
            );
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            toast.success("Notification deleted successfully!");
        } catch (error) {
            toast.error("Error deleting notification.");
        }
    };

    // Calculate Counts
    const totalNotifications = notifications.length;
    const readCount = notifications.filter((notification) => notification.read).length;
    const unreadCount = totalNotifications - readCount;

    return (
        <div className="overflow-y-auto max-h-[250px] max-w-[87%] justify-between mx-auto min-h-screen  ml-5">
            <ToastContainer
                className={`mt-11 ${window.innerWidth < 640 ? 'mx-2' : 'mx-10'}`}
            />

            {/* Notification Counts */}

            <div className="flex flex-wrap md:flex-nowrap space-x-0 md:space-x-4 space-y-4 md:space-y-0">
                <div
                    className="flex justify-between items-center p-4 bg-white shadow rounded w-full md:w-[32%]"
                    style={{ backgroundColor: counterColors.total }}
                >
                    <div className="flex items-center space-x-2">
                        <BellIcon className="h-6 w-6 text-gray-800" />
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Notifications</h3>
                            <p className="text-xl font-semibold text-gray-800">
                                {totalNotifications}
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className="flex justify-between items-center p-4 bg-white shadow rounded w-full md:w-[32%]"
                    style={{ backgroundColor: counterColors.read }}
                >
                    <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-6 w-6 text-gray-800" />
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Read</h3>
                            <p className="text-xl font-semibold text-gray-800">{readCount}</p>
                        </div>
                    </div>
                </div>

                <div
                    className="flex justify-between items-center p-4 bg-white shadow rounded w-full md:w-[32%]"
                    style={{ backgroundColor: counterColors.unread }}
                >
                    <div className="flex items-center space-x-2">
                        <InboxIcon className="h-6 w-6 text-gray-800" />
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Unread</h3>
                            <p className="text-xl font-semibold text-gray-800">{unreadCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-bold mb-4 text-start mt-5">Admin Notifications</h2>

            {/* Filter Dropdown */}
            <div className="mb-6 flex justify-center">
                <select
                    className="p-2 border rounded text-gray-700"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All Notifications</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>
            </div>

            {/* Notifications List */}
            {loading ? (
                <p className="text-center">Loading notifications...</p>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : filteredNotifications.length === 0 ? (
                <p className="text-gray-500 text-center">No notifications available.</p>
            ) : (
                <div className=" grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {filteredNotifications.map((notification) => (
                        <div
                            key={notification._id}
                            className={`p-4 rounded shadow-md transition-all duration-300 ${notification.read
                                ? "bg-gray-100 hover:bg-gray-200"
                                : "bg-yellow-100 hover:bg-yellow-200"
                                }`}
                        >
                            <h3 className="text-lg font-semibold">
                                {notification.title}
                            </h3>
                            <p className="text-sm text-gray-700">
                                {notification.description}
                            </p>
                            <div className="flex justify-between mt-2 flex-wrap">
                                <button
                                    onClick={() => markAsRead(notification._id)}
                                    className={`py-1 px-3 rounded text-sm ${notification.read
                                        ? "bg-gray-400 text-white cursor-not-allowed"
                                        : "bg-blue-500 text-white hover:bg-blue-600"
                                        }`}
                                    disabled={notification.read}
                                >
                                    {notification.read ? "Read" : "Mark as Read"}
                                </button>
                                <button
                                    onClick={() => deleteNotification(notification._id)}
                                    className="py-1 px-3 mt-2 sm:mt-0 rounded text-sm bg-red-500 text-white hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Notification;
