import { Spinner } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

function CustomerTable({ customers, loading }) {
  const allCustomers = customers.data || [];
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
                        className=" object-fit-cover rounded-circle border border-light-subtle"
                        width={20}
                        height={20}
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
                      className="btn btn-warning"
                    >
                      Edit
                    </Link>
                    <button className="btn btn-danger">Delete</button>
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
