import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerTable from "../components/CustomerTable";
import { Link } from "react-router-dom";
import BreadCrums from "../components/BreadCrums";
import { FiPlus } from "react-icons/fi";

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
  return (
    <>
      <div>
        <div className="mb-3 d-flex align-items-center gap-3 justify-content-between">
          <div>
            <h3>All Cutomers</h3>
            <small className="text-gray text-capitalize">
              <BreadCrums ></BreadCrums>
            </small>
          </div>
          <Link className="btn btn-success" to={"/customers/create"}>
            Create New <FiPlus size={18} />
          </Link>
        </div>
        <CustomerTable customers={customers} setCustomers={setCustomers} loading={loading}></CustomerTable>
      </div>
    </>
  );
};

export default Customers;
