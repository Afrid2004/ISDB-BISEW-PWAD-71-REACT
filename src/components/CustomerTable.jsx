import { Spinner } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";

function CustomerTable({ customers, loading, setCustomers }) {
  const allCustomers = customers.data || [];
  const BASE_URL = import.meta.env.VITE_API_PHP_BASE_URL;
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }
  if (allCustomers.length === 0) {
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
      confirmButtonText: "Yes, delete user!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `${BASE_URL}/customer/delete?id=${id}`,
          );
          const data = await res.data;
          if (data.success) {
            await Swal.fire({
              title: "Deleted!",
              text: `${data.message}`,
              icon: "success",
            });
            // refresh data 
            setCustomers((prev) => ({
              ...prev,
              data: prev.data.filter((item) => item.id !== id),
            }));
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
            <th>Email</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allCustomers.map((customer, index) => {
            return (
              <tr key={customer.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    {customer.photo ? (
                      <img
                        className="flex-shrink-0 object-fit-cover rounded-circle border border-light-subtle"
                        width={40}
                        height={40}
                        src={customer.photo}
                        alt={customer.name}
                      />
                    ) : (
                      ""
                    )}
                    <h6>{customer.name}</h6>
                  </div>
                </td>
                <td>{customer.email}</td>
                <td>{customer.mobile}</td>
                <td>{customer.address}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <Link
                      to={`/customers/edit/${customer.id}`}
                      className="btn btn-warning d-flex align-items-center gap-1"
                    >
                      < FiEdit /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(customer.id)}
                      className="btn btn-danger d-flex align-items-center gap-1"
                    >
                      <FiTrash2 /> Delete
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

export default CustomerTable;
