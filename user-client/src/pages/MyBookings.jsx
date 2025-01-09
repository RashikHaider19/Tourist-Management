import React, { useEffect, useState } from 'react';
import API from '../services/api';

function MyBookings() {
  const [myBookings, setMyBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const res = await API.get('/api/bookings/my-bookings');
      console.log('Fetched Bookings:', res.data); // Log to verify the response
      setMyBookings(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch bookings. Please try again later.');
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await API.put(`/api/bookings/${bookingId}/cancel`);
      alert('Booking canceled!');
      fetchMyBookings(); // Refresh the bookings list
    } catch (err) {
      console.error(err);
      alert('Failed to cancel booking.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Bookings</h2>
      {error && <p style={styles.error}>{error}</p>}
      {myBookings.length > 0 ? (
        <ul style={styles.list}>
          {myBookings.map((b) => (
            <li key={b._id} style={styles.bookingItem}>
              <h3>{b.package?.name || 'Unknown Package'}</h3>
              <p>Price: ${b.package?.price || 'N/A'}</p>
              <p>Status: {b.status}</p>
              {b.status === 'reserved' && (
                <button
                  onClick={() => cancelBooking(b._id)}
                  style={styles.cancelButton}
                >
                  Cancel Booking
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.noBookings}>You have no bookings.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '1.5rem',
    color: '#333',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  bookingItem: {
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
  },
  cancelButton: {
    padding: '5px 10px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  noBookings: {
    textAlign: 'center',
    color: '#555',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
};

export default MyBookings;
