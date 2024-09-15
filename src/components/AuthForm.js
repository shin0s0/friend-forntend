import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = ({ onAuthSuccess, isLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const endpoint = isLogin ? 'login' : 'register';
      const url = `https://fbackend-e7iw.onrender.com/api/auth/${endpoint}`;
      
      if (isLogin) {
        const response = await axios.post(url, { username, password });
        localStorage.setItem('token', response.data.token);
        onAuthSuccess();
      } else {
        await axios.post(url, { username, password });
        alert('Registration successful, please login.');
        navigate('/login'); // Navigate to login after registration
      }
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          disabled={loading}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          disabled={loading}
        />
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
        </button>
        {isLogin ? (
          <button type="button" onClick={() => navigate('/register')} disabled={loading}>
            Register
          </button>
        ) : (
          <button type="button" onClick={() => navigate('/login')} disabled={loading}>
            Login
          </button>
        )}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AuthForm;
