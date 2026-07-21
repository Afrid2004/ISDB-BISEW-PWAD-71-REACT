import React, { useEffect, useState } from 'react'
import UserTable from '../components/UserTable';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const fetchUsers = async () => {
    setLoading(true);
    try {
        const res = await axios.get(`${base_url}/users`);
        setUsers(res.data);
        return;
    } catch (error) {
        console.error(error);
    }
    finally{
        setLoading(false);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
    <div>
        <h3 className='mb-3'>All Users</h3>
        <UserTable users={users} loading={loading}></UserTable>
    </div>
    </>
  )
}

export default Users