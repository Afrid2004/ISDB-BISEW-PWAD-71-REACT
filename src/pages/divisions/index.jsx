import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DivisionTable from "../../components/DivisionTable";
import BreadCrums from "../../components/BreadCrums";

const Division = () => {
  const BASE_URL = import.meta.env.VITE_API_PHP_BASE_URL;
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDivisions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/division/`);
      const data = res.data;
      setDivisions(data.data);
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDivisions();
  }, []);

  return (
    <>
      <div>
        <div className="mb-3 d-flex align-items-center gap-3 justify-content-between">
          <div>
            <h3>All Divisions</h3>
            <small className="text-gray text-capitalize">
              <BreadCrums></BreadCrums>
            </small>
          </div>
          <Link className="btn btn-success" to={"/divisions/create"}>
            Create New
          </Link>
        </div>
        <DivisionTable divisions={divisions} setDivisions={setDivisions} loading={loading}></DivisionTable>
      </div>
    </>
  );
};

export default Division;
