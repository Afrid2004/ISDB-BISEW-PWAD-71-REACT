import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const HomeLayout = () => {
  return (
    <>
        <Header />
        <div>
            <div>
                <Sidebar />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
        <Footer />
    </>
  )
}

export default HomeLayout