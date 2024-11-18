import React, { useState, useEffect } from 'react';

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [filteredNotifications, setFilteredNotifications] = useState([]);
    const [filter, setFilter] = useState('all'); // 'all', 'read', 'unread'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        applyFilter();
    }, [filter, notifications]);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/tickets');
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            setError('Failed to fetch notifications. Please try again.');
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilter = () => {
        if (filter === 'all') {
            setFilteredNotifications(notifications);
        } else if (filter === 'read') {
            setFilteredNotifications(notifications.filter((notification) => notification.read));
        } else if (filter === 'unread') {
            setFilteredNotifications(notifications.filter((notification) => !notification.read));
        }
    };

    const markAsRead = async (ticketId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tickets/${ticketId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            setNotifications(notifications.map(notification =>
                notification._id === ticketId ? { ...notification, read: true } : notification
            ));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const deleteNotification = async (ticketId) => {
        try {
            // Optimistically update UI before deleting
            setNotifications(notifications.filter(notification => notification._id !== ticketId));

            const response = await fetch(`http://localhost:5000/api/tickets/${ticketId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    return (
        <div className="p-3 max-w-4xl mx-auto min-h-screen overflow-y-auto ml-0">
            <div className='min-h-screen overflow-y-auto'>
                <h2 className="text-xl font-bold mb-4 text-start">Admin Notifications</h2>

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

                {loading ? (
                    <p className="text-center">Loading notifications...</p>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : filteredNotifications.length === 0 ? (
                    <p className="text-gray-500 text-center">No notifications available.</p>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                        {filteredNotifications.map((notification) => (
                            <div
                                key={notification._id}
                                className={`p-4 rounded shadow-md ${notification.read ? 'bg-gray-100' : 'bg-yellow-100'} transition-opacity duration-500 ease-in-out opacity-100 hover:opacity-90`}
                            >
                                <h3 className="text-lg font-semibold">{notification.title}</h3>
                                <p className="text-sm text-gray-700">{notification.description}</p>
                                <div className="flex justify-between mt-2 flex-wrap">
                                    <button
                                        onClick={() => markAsRead(notification._id)}
                                        className={`py-1 px-3 rounded text-sm ${notification.read
                                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                                : 'bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105 transition-transform duration-200'
                                            }`}
                                        disabled={notification.read}
                                    >
                                        {notification.read ? 'Read' : 'Mark as Read'}
                                    </button>
                                    <button
                                        onClick={() => deleteNotification(notification._id)}
                                        className="py-1 px-3 mt-2 sm:mt-0 rounded text-sm bg-red-500 text-white hover:bg-red-600 transform hover:scale-105 transition-transform duration-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Notification;
