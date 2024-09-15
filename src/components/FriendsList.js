import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FriendList.css';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get('https://fbackend-e7iw.onrender.com/api/friends/friends', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setFriends(response.data);
      } catch (error) {
        setError('Error fetching friends.');
        console.error('Error fetching friends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="friends-list-container">
      <h2>Friends</h2>
      {loading ? (
        <p>Loading friends...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <ul className="friends-list">
          {friends.map((friend) => (
            <li key={friend._id} className="friend-item">
              {friend.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendsList;
