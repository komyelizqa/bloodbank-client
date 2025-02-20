import React from 'react';
import "./LoginForm.scss";


const LoginForm = ({ userType}) => {
  return (
    <main className="login-form">
      <div className="login-form__wrapper">
      <h2 className='login-form__header'>{userType} Login</h2>
      <form className='login-form__form'>
        <div className="login-form__input-wrapper">
        <input className = "login-form__input-email"
        placeholder="Enter your email address."
        type="email"
        name="email"></input>
        </div>
        <div className="login-form__input-wrapper">
        <input className = "login-form__input-password"
        placeholder="Enter your password."
        type="password"
        name="password"></input>
        </div>
        <button>LOGIN</button>
      </form>
      </div>
    </main>
  );
};

export default LoginForm;