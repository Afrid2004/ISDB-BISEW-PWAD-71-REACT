import { Spinner } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';

function UserTable({ users, loading }) {
    const allUsers = users.users || [];
    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" />
            </div>
        );
    }
    if (allUsers.length === 0) {
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
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Weight</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUsers.map((user, index) => {
                            return (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className='d-flex align-items-center gap-2'>
                                            <img className=' object-fit-cover rounded-circle border border-light-subtle' width={20} height={20} src={user.image} alt={`${user.firstName} ${user.lastName}`} />
                                            <h6>{`${user.firstName} ${user.lastName}`}</h6>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.age} Year</td>
                                    <td className='text-capitalize'>{user.gender}</td>
                                    <td >{Math.floor(user.weight)} KG</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default UserTable;