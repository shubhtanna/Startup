import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.profile);

  if (!user || user.accountType !== 'admin') {
    return <Navigate to='/' replace />
  }
  return (
    <div>
      Admin Pannel
      // Add your admin dashboard content here
      // For example, you can display a list of all users
      // and their details, or a list of all products
      // and their details, etc.
    </div>
  )
}

export default AdminDashboard