import { useState } from 'react'
import './App.css'
import Header from './layouts/Header'
import Footer from './layouts/Footer'
import Sidebar from './layouts/Sidebar'

function App() {
  return <>
    <Header />
    <br />
    <Sidebar />
    <br />
    <Footer />
  </>
}

export default App
