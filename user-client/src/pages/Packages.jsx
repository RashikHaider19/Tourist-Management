// user-client/src/pages/Packages.jsx (or similar)
import React, { useEffect, useState } from 'react';
import API from '../services/api';

function Packages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await API.get('/api/packages');
      setPackages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const bookPackage = async (packageId) => {
    try {
      await API.post('/api/bookings', { packageId });
      alert('Booking created successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to book. Are you logged in?');
    }
  };

  return (
    <div>
      <h2>Available Packages</h2>
      <ul>
        {packages.map(pkg => (
          <li key={pkg._id}>
            {pkg.name} - ${pkg.price}
            <button onClick={() => bookPackage(pkg._id)}>
              Book Now
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Packages;
