import Sidebar from '../components/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'
import "../index.css";



const Dashboard = () => {
    return (
        <div className='flex animate-fadeIn '>
            <Sidebar /> 
            <div className='flex-1 animate-fadeIn'>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard
 