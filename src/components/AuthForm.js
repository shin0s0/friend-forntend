import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.css';

const AuthForm = ({ onAuthSuccess, isLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post('https://fbackend-e7iw.onrender.com//api/auth/login', { username, password });
        localStorage.setItem('token', response.data.token);
        onAuthSuccess();
      } else {
        await axios.post('https://fbackend-e7iw.onrender.com//api/auth/register', { username, password });
        alert('Registration successful, please login.');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        {isLogin ? (
          <button type="button" onClick={() => window.location.href = '/register'}>
            Register
          </button>
        ) : (
          <button type="button" onClick={() => window.location.href = '/login'}>
            Login
          </button>
        )}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default AuthForm;
