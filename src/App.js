import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/home">
          {isAuthenticated ? <Home /> : <Navigate to="/" />}
        </Route>
        <Route path="/register">
          <Register onAuthSuccess={handleAuthSuccess} />
        </Route>
        <Route path="/" exact>
          <Login onAuthSuccess={handleAuthSuccess} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
