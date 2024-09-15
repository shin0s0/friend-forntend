import React, { useState } from 'react';
import UserList from '../components/UserList';
import FriendsList from '../components/FriendsList';
import Recommendations from '../components/Recommendations';
import axios from 'axios';


const Home = () => {
  const [showRecommendations, setShowRecommendations] = useState(true);

  const handleAddFriend = async (userId) => {
    try {
      await axios.post('http://localhost:5000/api/friends/request', { receiverId: userId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Friend request sent');
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <FriendsList />
      <UserList onAddFriend={handleAddFriend} />
      {showRecommendations && <Recommendations />}
      <button onClick={() => setShowRecommendations(!showRecommendations)}>
        {showRecommendations ? 'Hide Recommendations' : 'Show Recommendations'}
      </button>
    </div>
  );
};

export default Home;
