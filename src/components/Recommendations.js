import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Recommendations.css';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get('https://fbackend-e7iw.onrender.com/api/friends/recommendations', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setRecommendations(response.data);
      } catch (error) {
        setError('Error fetching recommendations.');
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="recommendations-container">
      <h2>Friend Recommendations</h2>
      {loading ? (
        <p>Loading recommendations...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <ul className="recommendations-list">
          {recommendations.map((user) => (
            <li key={user._id} className="recommendation-item">
              {user.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Recommendations;
