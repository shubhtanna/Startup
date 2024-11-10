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
    </div>
  )
}

export default AdminDashboard