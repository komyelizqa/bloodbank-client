import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./WelcomePage.scss";
import Footer from "../../components/Footer/Footer";
import LoginForm from '../../components/LoginForm/LoginForm';

const WelcomePage = ({ setUserRole }) => {
    const navigate = useNavigate();
  
    const handleLogin = (role) => {
      localStorage.setItem('userRole', role);
      setUserRole(role);
      window.dispatchEvent(new Event('userRoleChanged'));
      navigate('/calendar');
    };
  
    return (
      <>
      <main className="login-page">
        <h1 className="login-page__header">Welcome to BloodBank!</h1>
        <h2 className="login-page__header-second">Choose your account type</h2>
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
      <LoginForm/>
      <Footer/>
      </>
    );
  };
  
  export default WelcomePage;

