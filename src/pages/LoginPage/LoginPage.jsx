import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./LoginPage.scss";

const LoginPage = () => {
    const navigate = useNavigate();
  
    const handleLogin = (role) => {
      localStorage.setItem('userRole', role);
      navigate('/calendar');
    };
  
    return (
      <main className="login-page">
        <h1 className="login-page__header">Welcome, Please Login</h1>
        <div className="login-page__button-group">
          <button
            className="login-page__button login-page__button--volunteer"
            onClick={() => handleLogin('volunteer')}
          >
            Login as Volunteer
          </button>
          <button
            className="login-page__button login-page__button--doctor"
            onClick={() => handleLogin('doctor')}
          >
            Login as Doctor
          </button>
        </div>
      </main>
    );
  };
  
  export default LoginPage;

