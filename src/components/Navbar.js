import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional CSS for styling

const Navbar = ({ isAuthenticated }) => {
  return (
    <nav className="navbar">
      <h1 className="logo">Friend App</h1>
      <ul className="nav-links">
        {isAuthenticated ? (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
