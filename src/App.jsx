import { useState } from "react";
import "./App.css";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Sidebar from "./layouts/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import HomeLayout from "./layouts/HomeLayout";
import Users from "./pages/Users";
import Customers from "./pages/Customers";
import CustomerEdit from "./pages/CustomerEdit";
import CustomerCreate from "./pages/CustomerCreate";
import DivisionCreate from "./pages/divisions/create";
import Division from "./pages/divisions";
import DivisionEdit from "./pages/divisions/edit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* home layout pages  */}
          <Route path="/" element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/edit/:id" element={<CustomerEdit />} />
            <Route path="/customers/create" element={<CustomerCreate />} />
            <Route path="/divisions/" element={ <Division/> } />
            <Route path="/divisions/create" element={ <DivisionCreate/> } />
            <Route path="/divisions/edit/:id" element={ <DivisionEdit /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
