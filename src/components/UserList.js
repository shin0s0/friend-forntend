import React, { useState } from 'react';
import axios from 'axios';
import './UserList.css';

const UserList = ({ onAddFriend }) => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://fbackend-e7iw.onrender.com/api/friends/search', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: { username: query }
      });
      setUsers(response.data);
    } catch (error) {
      setError('Error fetching users.');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-list-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users"
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      {error && <p className="error-message">{error}</p>}
      <ul className="user-list">
        {users.map(user => (
          <li key={user._id} className="user-list-item">
            {user.username}
            <button onClick={() => onAddFriend(user._id)} className="add-friend-button">
              Add Friend
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
