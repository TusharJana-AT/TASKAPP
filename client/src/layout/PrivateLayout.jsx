import React from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function PrivateLayout() {
  const {user,loading} = useAuth()
  if(loading) return <div>Loading ... </div>
  if(!user) return <Navigate to='/login' replace/>

  return (
    <div>
        <Header/>
            <Outlet/>
        <Footer/>
    </div>
  
  )
}

export default PrivateLayout