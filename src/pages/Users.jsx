import React, { useEffect, useState } from 'react'
import UserTable from '../components/UserTable';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const fetchUsers = async () => {
    try {
        const res = await axios.get(`${base_url}/users`);
        setUsers(res.data);
        return;
    } catch (error) {
        return error.message;
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
    <div>
        <h3 className='mb-3'>All Users</h3>
        <UserTable users={users}></UserTable>
    </div>
    </>
  )
}

export default Users