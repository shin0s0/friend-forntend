import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Recommendations.css';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get('https://fbackend-e7iw.onrender.com//api/friends/recommendations', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setRecommendations(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div>
      <h2>Friend Recommendations</h2>
      <ul>
        {recommendations.map(user => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
