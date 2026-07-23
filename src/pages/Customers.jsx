import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerTable from "../components/CustomerTable";
import { Link } from "react-router-dom";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const base_url = import.meta.env.VITE_API_PHP_BASE_URL;
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${base_url}/customer/`);
      setCustomers(res.data);
      return;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(customers)
  return (
    <>
      <div>
        <div className="mb-3 d-flex align-items-center gap-3 justify-content-between">
            <h3 >All Cutomers</h3>
            <Link className="btn btn-success" to={"/customers/create"}>Create New</Link>
        </div>
        <CustomerTable customers={customers} loading={loading}></CustomerTable>
      </div>
    </>
  );
};

export default Customers;
