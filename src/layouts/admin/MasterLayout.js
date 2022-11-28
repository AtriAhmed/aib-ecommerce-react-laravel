import React,{ useEffect } from 'react'
import { Footer } from './Footer'
import NavbarAdmin from './NavbarAdmin'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router'


const MasterLayout = () => {
const  navigate  = useNavigate()

useEffect(() => {
 if(window.location.pathname=='/admin'){
     navigate('/admin/dashboard');
 }

}, [])
  return (
    <div className='sb-nav-fixed'>
        <NavbarAdmin/>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <Sidebar/>
            </div>
            <div id="layoutSidenav_content"  className='content'>
                <main>
                    <Outlet/>
                </main>

            </div>
        </div>
    </div>
  )
}

export default MasterLayout
