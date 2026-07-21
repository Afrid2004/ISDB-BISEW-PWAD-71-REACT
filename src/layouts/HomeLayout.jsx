import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const HomeLayout = () => {
    return (
        <>
            <Header />
            <div className='container'>
                <div className='row min-vh-100'>
                    <div className='col-lg-3 sticky-top align-self-start border-end border-1 border-secondary-subtle pt-2 pe-2'>
                        <Sidebar />
                    </div>
                    <div className='col-lg-9 p-2'>
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default HomeLayout