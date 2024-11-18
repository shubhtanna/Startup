import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Sidenavbar from './sidenavbar'

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.profile);

  if (!user || user.accountType !== 'admin') {
    return <Navigate to='/' replace />
  }
  return (
    <div className='fixed'>
    <div className='h-screen overflow-auto overflow-y-scroll'>
        <Sidenavbar/>
        </div>
    </div>
  )
}

export default AdminDashboard