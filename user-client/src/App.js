import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MyBookings from './pages/MyBookings'; // Add this import
import PackageDetails from './pages/PackageDetails';
import Packages from './pages/Packages';
import PaymentPageWrapper from './pages/PaymentPage';
import UserLogin from './pages/UserLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:packageId" element={<PackageDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} /> {/* Add this route */}
        <Route path="/demo-payment" element={<PaymentPageWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
