// admin-client/src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import API from '../services/api';

function AdminDashboard() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/api/admin/dashboard');
        setMessage(res.data.message);
      } catch (error) {
        setMessage('Error fetching dashboard data');
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>{message}</p>
      {/* Additional admin functionality here */}
    </div>
  );
}

export default AdminDashboard;
