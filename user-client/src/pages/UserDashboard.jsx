import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the user token from localStorage
    localStorage.removeItem('userToken');
    // Redirect to the user login page (assuming path="/")
    navigate('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Dashboard</h1>
      <p>Welcome! You are logged in as a user.</p>
      <button onClick={handleLogout}>Logout</button>

      <hr />

      {/* Add any user-specific links or content here */}
      <button onClick={() => navigate('/packages')}>View Packages</button>
      <button onClick={() => navigate('/my-bookings')} style={{ marginLeft: '10px' }}>
        My Bookings
      </button>
      <button onClick={() => navigate('/payment')} style={{ marginLeft: '10px' }}>
        Payment Page
      </button>
    </div>
  );
}

export default UserDashboard;
