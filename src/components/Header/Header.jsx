import React from 'react';
import "./Header.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/bloodbank-logo.png";
import profile from "../../assets/icons/profile-icon.svg";
import settings from "../../assets/icons/settings-icon.svg";

const Header = ({ userType, userName, userAvatar }) => {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/calendar" className="header__nav-link">
          <img className="header__logo" src={logo} alt="BloodBank Logo" />
        </Link>
        <section className="header__user-links-container">
          <img className="header__profile" src={profile} alt="Profile Icon" />
          <img className="header__settings" src={settings} alt="Settings Icon" />
        </section>
        <section className="header__text-container">
          <h4>{userType}</h4>
          <h5>{userName}</h5>
        </section>
        <img
          src={userAvatar}
          className="header__avatar header__avatar--main"
          alt="avatar"
        />
      </div>
    </header>
  );
};

export default Header;