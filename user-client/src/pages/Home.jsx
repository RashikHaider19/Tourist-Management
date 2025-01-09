// user-client/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import API from '../services/api';

function Home() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Fetch user profile data
    API.get('/api/user/profile')
      .then((res) => {
        setMessage(res.data.message);
        setUserName(res.data.name || 'User');
      })
      .catch((err) => {
        setError(err.response?.data?.error || 'Unauthorized');
      });
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome, {userName}!</h1>
        <p style={styles.message}>
          {error ? <span style={styles.error}>{error}</span> : message}
        </p>
        <div style={styles.buttons}>
          <button
            style={styles.button}
            onClick={() => (window.location.href = '/packages')}
          >
            View Packages
          </button>
          <button
            style={{ ...styles.button, backgroundColor: '#4CAF50' }}
            onClick={() => (window.location.href = '/my-bookings')}
          >
            My Bookings
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  card: {
    width: '400px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.8rem',
    color: '#333',
    marginBottom: '20px',
  },
  message: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '20px',
  },
  error: {
    color: 'red',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#2196F3',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
  },
};

export default Home;
