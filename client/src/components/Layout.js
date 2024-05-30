import React, { useState } from 'react'
import '../layout.css'
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'; 
import { showLoading } from '../redux/alertsSlice';
import { setUser } from '../redux/userSlice';
import { Badge } from 'antd';

function Layout({children}) {
    const [collapsed, setCollapsed] = useState(false);
    const {user} = useSelector((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();
    
    const userMenu =[

        {
            name: 'home',
            path: '/',
            icon: 'ri-home-line'
        },
        {
            name: 'Appointments',
            path: '/appointments',
            icon: 'ri-file-list-2-line'
        },
        {
            name: 'Apply Doctor',
            path: '/apply-doctor',
            icon: 'ri-hospital-line'
        },
        {
            name: 'Profile',
            path: '/profile',
            icon: 'ri-user-3-line'
        },
       
    ];
    const doctorMenu =[

        {
            name: 'home',
            path: '/',
            icon: 'ri-home-line'
        },
        {
            name: 'Appointments',
            path: '/doctor/appointments',
            icon: 'ri-file-list-2-line'
        },
        {
            name: 'Profile',
            path: `/doctor/profile/${user?._id}`,
            icon: 'ri-user-3-line'
        },
       
    ];

    const adminMenu =[

        {
            name: 'home',
            path: '/',
            icon: 'ri-home-line'
        },
        {
            name: 'Users',
            path: '/users',
            icon: 'ri-user-line'
        },
        {
            name: 'Doctors',
            path: '/doctors',
            icon: 'ri-user-heart-line'
        },
        {
            name: 'Profile',
            path: '/profile',
            icon: 'ri-user-3-line'
        },

    ];


    const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
    const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
  return (
    <div className='main p-2'>
        <div className='d-flex layout'>
            <div className='sidebar'>
                <div className='sidebar-header'>
                    <h1 className='logo'>MD</h1>
                    <h1 className='role'>{role}</h1>
                </div>

                <div className='menu'>
                    {menuToBeRendered.map((menu) => {
                        const isActive = location.pathname === menu.path
                        return <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                            <i className={menu.icon}></i>
                            {collapsed && <Link to={menu.path}>{menu.name}</Link>}
                            </div>
                    })}
                    <div className={`d-flex menu-item`} onClick={() =>{
                        localStorage.clear()
                        navigate("/login")
                    }}>
                            <i className='ri-logout-circle-line'></i>
                            {collapsed && <Link to='/login'>LogOut</Link>}
                            </div>
                </div>
            </div>
            <div className='content'>
                <div className='header'>
                {collapsed ? <i className="ri-close-circle-line header-action-icon" onClick={()=>setCollapsed(false)}></i> : <i className="ri-menu-unfold-fill header-action-icon" onClick={()=>setCollapsed(true)}></i>}

                <div className='d-flex align-items-center px-4'>
                    <Badge count={user?.unseenNotifications.length} onClick={()=>navigate('/notifications')}> 
                    <i className="ri-notification-4-line header-action-icon px-2"></i>

                    </Badge>
                

                <Link className='anchor mx-3' to='/profile'>{user?.name}</Link>
                
                

                </div>

                </div>
                <div className='body'>
                    {children}
                    
                

                </div>

            </div>

        </div>
    </div>
  )
}

export default Layout