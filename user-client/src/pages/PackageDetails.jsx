// // user-client/src/pages/PackageDetails.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom'; // to get packageId from URL
// import API from '../services/api';

// function PackageDetails() {
//   const { packageId } = useParams();
//   const [pack, setPack] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState('');

//   useEffect(() => {
//     fetchPackage();
//     fetchReviews();
//     // eslint-disable-next-line
//   }, [packageId]);

//   const fetchPackage = async () => {
//     try {
//       const res = await API.get(`/api/packages/${packageId}`);
//       setPack(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchReviews = async () => {
//     try {
//       const res = await API.get(`/api/reviews/package/${packageId}`);
//       setReviews(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const submitReview = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post('/api/reviews', {
//         packageId,
//         rating,
//         comment
//       });
//       // Clear form
//       setRating(5);
//       setComment('');
//       // Refresh reviews
//       fetchReviews();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to submit review. Are you logged in?');
//     }
//   };

//   return (
//     <div>
//       <h2>Package Details</h2>
//       {pack && (
//         <div>
//           <h3>{pack.name}</h3>
//           <p>Price: ${pack.price}</p>
//           <p>{pack.description}</p>
//           {/* possibly more details */}
//         </div>
//       )}

//       <hr />

//       <h3>Reviews</h3>
//       <form onSubmit={submitReview}>
//         <label>Rating (1-5):</label>
//         <input
//           type="number"
//           min="1"
//           max="5"
//           value={rating}
//           onChange={(e) => setRating(e.target.value)}
//         />
//         <br />
//         <label>Comment:</label>
//         <textarea
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         />
//         <br />
//         <button type="submit">Submit Review</button>
//       </form>

//       <ul>
//         {reviews.map((rev) => (
//           <li key={rev._id}>
//             <strong>{rev.user?.name}</strong> rated: {rev.rating} <br />
//             {rev.comment}
//             <hr />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default PackageDetails;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  }, [packageId]);

  const fetchPackage = async () => {
    try {
      const res = await API.get(`/api/packages/${packageId}`);
      setPack(res.data);
    } catch (err) {
      console.error('Error fetching package details:', err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/api/reviews/package/${packageId}`);
      setReviews(res.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/reviews', {
        packageId,
        rating,
        comment,
      });
      setRating(5);
      setComment('');
      fetchReviews(); // Refresh the reviews after submission
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Package Details</h2>
      {pack && (
        <div>
          <h3>{pack.name}</h3>
          <p>Price: ${pack.price}</p>
          <p>{pack.description}</p>
        </div>
      )}

      <hr />

      <h3>Reviews</h3>
      <form onSubmit={submitReview} style={{ marginBottom: '20px' }}>
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
          style={{ width: '100%', minHeight: '50px' }}
        />
        <br />
        <button type="submit" style={{ marginTop: '10px' }}>
          Submit Review
        </button>
      </form>

      <ul>
        {reviews.map((review) => (
          <li key={review._id} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
            <strong>{review.user?.name || 'Anonymous'}</strong> rated: {review.rating}/5
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PackageDetails;
