import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div
          style={{
            height: `calc(100vh - 75px)`,
          }}
        >
          <div className="row h-100">
            <aside className="col-lg-3 sticky-top align-self-start h-100">
              <div className="border-end border-1 border-dark pt-2 pe-3 h-100">
                <Sidebar />
              </div>
            </aside>
            <div className="col-lg-9 overflow-y-scroll h-100 scrollbar">
              <div className="p-2">
                <Outlet></Outlet>

                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
