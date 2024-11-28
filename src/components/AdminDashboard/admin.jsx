import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Sidenavbar from './sidenavbar'

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.profile);

  if (!user || user.accountType !== 'admin') {
    return <Navigate to='/admin' replace />
  }
  return (
    <div className='overflow-auto scrollbar-thin scrollbar-none'>
    <div className='fixed'>
        <Sidenavbar/>
        </div>
    </div>
  )
}

export default AdminDashboard