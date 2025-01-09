// admin-client/src/pages/Logout.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function Logout() {
  // Remove the admin token from localStorage
  localStorage.removeItem('adminToken');
  // Redirect to admin login route ("/" in this example)
  return <Navigate to="/" />;
}

export default Logout;
