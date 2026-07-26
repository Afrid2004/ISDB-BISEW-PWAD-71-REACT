import { Spinner } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { formatDate } from "../utils/formateDate";

function DivisionTable({ divisions, loading, setDivisions }) {
    const BASE_URL = import.meta.env.VITE_API_PHP_BASE_URL;
    const allDivisions = divisions || [];
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }
  if (allDivisions.length === 0) {
    return (
      <Alert variant="warning" className="text-center">
        No Data Found!
      </Alert>
    );
  }

  const handleDelete = async (id) => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#212529",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete division!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `${BASE_URL}/division/delete?id=${id}`,
          );
          const data = await res.data;
          if (data.success) {
            await Swal.fire({
              title: "Deleted!",
              text: `${data.message}`,
              icon: "success",
            });
            console.log(data)
            setDivisions((prev) => prev.filter((item) => item.id !== id));
          } else {
            await Swal.fire({
              title: "Failed!",
              text: `${data.message}`,
              icon: "error",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text:
              error.response?.data?.message ||
              error.message ||
              "Something went wrong!",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div>
      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Name Bangla</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allDivisions.map((data, idx) => {
            return (
              <tr key={data.id}>
                <td>{idx + 1}</td>
                <td>{data.name}</td>
                <td>{data.name_bn}</td>
                <td>{formatDate(data.created_at)}</td>
                <td>
                  <div className="d-flex gap-2 align-items-center">
                    <Link to={`/divisions/edit/${data.id}`}>
                      <button className="btn btn-warning">Edit</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(data.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default DivisionTable;
