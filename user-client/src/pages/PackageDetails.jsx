// user-client/src/pages/PackageDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // to get packageId from URL
import API from '../services/api';

function PackageDetails() {
  const { packageId } = useParams();
  const [pack, setPack] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetchPackage();
    fetchReviews();
    // eslint-disable-next-line
  }, [packageId]);

  const fetchPackage = async () => {
    try {
      const res = await API.get(`/api/packages/${packageId}`);
      setPack(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/api/reviews/package/${packageId}`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/reviews', {
        packageId,
        rating,
        comment
      });
      // Clear form
      setRating(5);
      setComment('');
      // Refresh reviews
      fetchReviews();
    } catch (err) {
      console.error(err);
      alert('Failed to submit review. Are you logged in?');
    }
  };

  return (
    <div>
      <h2>Package Details</h2>
      {pack && (
        <div>
          <h3>{pack.name}</h3>
          <p>Price: ${pack.price}</p>
          <p>{pack.description}</p>
          {/* possibly more details */}
        </div>
      )}

      <hr />

      <h3>Reviews</h3>
      <form onSubmit={submitReview}>
        <label>Rating (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <br />
        <label>Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <br />
        <button type="submit">Submit Review</button>
      </form>

      <ul>
        {reviews.map((rev) => (
          <li key={rev._id}>
            <strong>{rev.user?.name}</strong> rated: {rev.rating} <br />
            {rev.comment}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PackageDetails;
