import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div className="h-100">
        <h3 className="text-white mb-3">Contents</h3>

        <div>
          <div className="d-flex flex-column gap-3">
            <Link to={"/users"} className="text-decoration-none">
              <div className="bg-hover px-3 py-2 text-light border border-dark">Users (useEffect, useState, Axios)</div>
            </Link>
            <Link to={"/customers"} className="text-decoration-none">
              <div className="bg-hover px-3 py-2 text-light border border-dark">Customer CRUD</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}


export default Sidebar;
