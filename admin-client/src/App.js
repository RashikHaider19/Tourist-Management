// // admin-client/src/App.js
// import React from 'react';
// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// import AdminDashboard from './pages/AdminDashboard';
// import AdminLogin from './pages/AdminLogin';
// import Logout from './pages/Logout';
// import ManageBookings from './pages/ManageBookings'; // If you have a page to view all bookings
// import ManagePackages from './pages/ManagePackages';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Admin Login (default) */}
//         <Route path="/" element={<AdminLogin />} />
        
//         {/* Admin Dashboard */}
//         <Route path="/dashboard" element={<AdminDashboard />} />
        
//         {/* Manage Packages (CRUD) */}
//         <Route path="/manage-packages" element={<ManagePackages />} />
        
//         {/* (Optional) Manage Bookings page */}
//         <Route path="/manage-bookings" element={<ManageBookings />} />
        
//         {/* Logout route */}
//         <Route path="/logout" element={<Logout />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Import your admin pages
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import ManageBookings from './pages/ManageBookings'; // if you have it
import ManagePackages from './pages/ManagePackages';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin login page */}
        <Route path="/" element={<AdminLogin />} />

        {/* Admin dashboard */}
        <Route path="/dashboard" element={<AdminDashboard />} />

        {/* Manage packages (CRUD) */}
        <Route path="/manage-packages" element={<ManagePackages />} />

        {/* (Optional) Manage bookings */}
        <Route path="/manage-bookings" element={<ManageBookings />} />
      </Routes>
    </Router>
  );
}

export default App;
