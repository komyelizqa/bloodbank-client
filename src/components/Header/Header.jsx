import React from 'react';
import "./Header.scss";
import { Link } from "react-router-dom";
// import Button from '../Button/Button';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        {/* <Link to="/" className="header__nav-link"> */}
          {/* <img className="header__logo" src={logo} alt="BloodBank Logo" /> */}
        {/* </Link> */}
        {/* <Link to="/upload" className="header__btn-link"> */}
          {/* <Button className="header__btn">
            UPLOAD
          </Button> */}
        {/* </Link> */}
        {/* <img
          src={avatar}
          className="header__avatar header__avatar--main"
          alt="avatar"
        />
        <img
          src={avatar2}
          className="header__avatar header__avatar--secondary"
          alt="avatar-secondary"
        /> */}
      </div>
    </header>
  );
}

export default Header;