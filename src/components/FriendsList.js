import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FriendList.css';


const FriendsList = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get('https://fbackend-e7iw.onrender.com//api/friends/friends', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setFriends(response.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div>
      <h2>Friends</h2>
      <ul>
        {friends.map(friend => (
          <li key={friend._id}>{friend.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
