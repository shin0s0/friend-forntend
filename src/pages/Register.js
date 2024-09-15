import React from 'react';
import AuthForm from '../components/AuthForm';

const Register = ({ onAuthSuccess }) => {
  return (
    <div>
      <h1>Register Page</h1>
      <AuthForm onAuthSuccess={onAuthSuccess} isLogin={false} />
    </div>
  );
};

export default Register;
