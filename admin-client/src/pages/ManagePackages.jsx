// admin-client/src/pages/ManagePackages.jsx
import React, { useEffect, useState } from 'react';
import API from '../services/api';

function ManagePackages() {
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    type: 'tour',
    price: 0,
    description: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

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

  const createOrUpdatePackage = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update package
        await API.put(`/api/packages/${editingId}`, formData);
        setIsEditing(false);
        setEditingId(null);
      } else {
        // Create package
        await API.post('/api/packages', formData);
      }
      setFormData({ name: '', type: 'tour', price: 0, description: '' });
      fetchPackages();
    } catch (err) {
      console.error(err);
    }
  };

  const startEditing = (pkg) => {
    setIsEditing(true);
    setEditingId(pkg._id);
    setFormData({
      name: pkg.name,
      type: pkg.type,
      price: pkg.price,
      description: pkg.description,
    });
  };

  const deletePackage = async (id) => {
    try {
      await API.delete(`/api/packages/${id}`);
      fetchPackages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Manage Packages</h2>
      <form onSubmit={createOrUpdatePackage} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
          required
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: isEditing ? '#2196F3' : '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {isEditing ? 'Update Package' : 'Create Package'}
        </button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {packages.map((pkg) => (
          <li
            key={pkg._id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
            }}
          >
            <strong>{pkg.name}</strong> - ${pkg.price}
            <p>{pkg.description}</p>
            <button
              onClick={() => startEditing(pkg)}
              style={{
                marginRight: '10px',
                padding: '5px 10px',
                backgroundColor: '#2196F3',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Edit
            </button>
            <button
              onClick={() => deletePackage(pkg._id)}
              style={{
                padding: '5px 10px',
                backgroundColor: '#f44336',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManagePackages;
