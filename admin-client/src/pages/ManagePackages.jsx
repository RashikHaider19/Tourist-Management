import React, { useEffect, useState } from 'react';
import API from '../services/api';

function ManagePackages() {
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    type: 'tour',
    price: 0,
    description: ''
  });

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

  const createPackage = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/packages', formData);
      console.log(res.data);
      fetchPackages();
    } catch (err) {
      console.error(err);
    }
  };

  // ... handle update/delete similarly

  return (
    <div>
      <h2>Manage Packages</h2>
      <form onSubmit={createPackage}>
        <input
          placeholder="Name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        {/* ... type, price, description inputs ... */}
        <button type="submit">Create</button>
      </form>

      <ul>
        {packages.map(pkg => (
          <li key={pkg._id}>
            {pkg.name} - ${pkg.price}
            {/* add Edit/Delete buttons here */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManagePackages;
