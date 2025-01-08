// user-client/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import API from '../services/api';

function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // user-only route
    API.get('/api/user/profile')
      .then((res) => {
        setMessage(res.data.message + ` (User ID: ${res.data.userId})`);
      })
      .catch((err) => {
        setMessage('Error: ' + (err.response?.data?.error || 'Unauthorized'));
      });
  }, []);

  return (
    <div>
      <h2>Home - User Portal</h2>
      <p>{message}</p>
    </div>
  );
}

export default Home;
