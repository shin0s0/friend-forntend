import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('YOUR_BACKEND_URL/api/friends', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFriends(response.data);
    };
    fetchFriends();
  }, []);

  return (
    <div className="container">
      <h2 className="header">Welcome to the Friend App</h2>
      {friends.length > 0 ? (
        <div>
          <h3>Your Friends</h3>
          <ul>
            {friends.map(friend => (
              <li key={friend._id} className="card">
                {friend.username}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>You have no friends yet. Search for users and add them!</p>
      )}
    </div>
  );
};

export default Home;
