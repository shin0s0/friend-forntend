import React, { useState } from 'react';
import axios from 'axios';
import './UserList.css';

const UserList = ({ onAddFriend }) => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://fbackend-e7iw.onrender.com//api/friends/search', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: { username: query }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users"
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username}
            <button onClick={() => onAddFriend(user._id)}>Add Friend</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
