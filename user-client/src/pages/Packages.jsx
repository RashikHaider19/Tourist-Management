import React, { useEffect, useState } from 'react';
import API from '../services/api';

function Packages() {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await API.get('/api/packages');
      setPackages(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch packages. Please try again later.');
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
    <div style={{ padding: '20px' }}>
      <h2>Available Packages</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {packages.length > 0 ? (
          packages.map((pkg) => (
            <li
              key={pkg._id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
              }}
            >
              <h3>{pkg.name}</h3>
              <p>Price: ${pkg.price}</p>
              <p>{pkg.description}</p>
              <button
                onClick={() => bookPackage(pkg._id)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Book Now
              </button>
            </li>
          ))
        ) : (
          <p>No packages available.</p>
        )}
      </ul>
    </div>
  );
}

export default Packages;
