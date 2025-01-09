// user-client/src/pages/MyBookings.jsx
import React, { useEffect, useState } from 'react';
import API from '../services/api';

function MyBookings() {
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const res = await API.get('/api/bookings/my-bookings');
      setMyBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await API.put(`/api/bookings/${bookingId}/cancel`);
      alert('Booking canceled!');
      fetchMyBookings(); // refresh list
    } catch (err) {
      console.error(err);
      alert('Failed to cancel booking.');
    }
  };

  return (
    <div>
      <h2>My Bookings</h2>
      <ul>
        {myBookings.map(b => (
          <li key={b._id}>
            Package: {b.package?.name} | Status: {b.status}
            {b.status === 'reserved' && (
              <button onClick={() => cancelBooking(b._id)}>Cancel</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyBookings;
