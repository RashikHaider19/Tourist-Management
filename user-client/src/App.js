// user-client/src/App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PaymentPageWrapper from './pages/PaymentPage';
import UserLogin from './pages/UserLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/packages/:packageId" element={<PackageDetails />} />
        <Route path="/demo-payment" element={<PaymentPageWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
