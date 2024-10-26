import React from 'react';
import "./Header.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/bloodbank-logo.png";
// import Button from '../Button/Button';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__nav-link">
          <img className="header__logo" src={logo} alt="BloodBank Logo" />
        </Link>
        {/* <Link to="/upload" className="header__btn-link"> */}
          {/* <Button className="header__btn">
            UPLOAD
          </Button> */}
        {/* </Link> */}
        <h4>Volunteer</h4>
        {/* <img
          src={avatar}
          className="header__avatar header__avatar--main"
          alt="avatar"
        /> */}
      </div>
    </header>
  );
}

export default Header;