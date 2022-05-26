import React, { useState } from "react";
import { MenuIcon, CloseIcon } from "../components";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const Navbar = () => {
  const [menu, setMenu] = useState(true);

  const handleClick = () => {
    setMenu(!menu);
  };

  return (
    <nav className="navbar-items">
      <h1 className="navbar-logo" onClick={Navigate("/home")}>
        Cryptonian
      </h1>
      <img className="logo" src={logo} alt="logo" />
      <div className="menu-icon" onClick={() => handleClick()}>
        {menu ? <MenuIcon /> : <CloseIcon />}
      </div>
      <ul className={!menu ? "nav-menu active" : "nav-menu"}>
        <li key="1" className="nav-links">
          <Link to="/">Home</Link>
        </li>
        <li key="2" className="nav-links">
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        </li>
        <li key="3" className="nav-links">
          <Link to="/news">News</Link>
        </li>
        <li key="4" className="nav-links">
          <Link to="/prediction">Prediction</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
