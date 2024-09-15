import React from 'react';
import AuthForm from '../components/AuthForm';

const Login = ({ onAuthSuccess }) => {
  return (
    <div>
      <h1>Login Page</h1>
      <AuthForm onAuthSuccess={onAuthSuccess} isLogin={true} />
    </div>
  );
};

export default Login;
