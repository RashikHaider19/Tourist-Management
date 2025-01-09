// user-client/src/pages/Logout.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function Logout() {
  // Remove the user token from localStorage
  localStorage.removeItem('userToken');
  // Redirect back to the user login page ("/" in this example)
  return <Navigate to="/" />;
}

export default Logout;
