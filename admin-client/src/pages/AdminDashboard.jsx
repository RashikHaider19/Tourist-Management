import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the admin token from localStorage
    localStorage.removeItem('adminToken');
    // Redirect to admin login page (assuming path="/")
    navigate('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome! You are logged in as an admin.</p>
      <button onClick={handleLogout}>Logout</button>

      <hr />

      {/* Add admin-specific links or content here */}
      <button onClick={() => navigate('/manage-packages')}>Manage Packages</button>
      <button onClick={() => navigate('/manage-bookings')} style={{ marginLeft: '10px' }}>
        Manage Bookings
      </button>
    </div>
  );
}

export default AdminDashboard;
