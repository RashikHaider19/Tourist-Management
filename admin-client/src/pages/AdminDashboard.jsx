// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// function AdminDashboard() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Remove the admin token from localStorage
//     localStorage.removeItem('adminToken');
//     // Redirect to admin login page (assuming path="/")
//     navigate('/');
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Admin Dashboard</h1>
//       <p>Welcome! You are logged in as an admin.</p>
//       <button onClick={handleLogout}>Logout</button>

//       <hr />

//       {/* Add admin-specific links or content here */}
//       <button onClick={() => navigate('/manage-packages')}>Manage Packages</button>
//       <button onClick={() => navigate('/manage-bookings')} style={{ marginLeft: '10px' }}>
//         Manage Bookings
//       </button>
//     </div>
//   );
// }

// export default AdminDashboard;


// admin-client/src/pages/AdminDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Admin Dashboard</h1>
      <p>Welcome! You are logged in as an admin.</p>
      <button
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          marginBottom: '20px',
          backgroundColor: '#f44336',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
      <div>
        <button
          onClick={() => navigate('/manage-packages')}
          style={{
            padding: '10px 20px',
            margin: '10px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Manage Packages
        </button>
        <button
          onClick={() => navigate('/manage-bookings')}
          style={{
            padding: '10px 20px',
            margin: '10px',
            backgroundColor: '#2196F3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Manage Bookings
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
