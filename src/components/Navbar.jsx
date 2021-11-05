import React,{useState} from "react";
import { Avatar, MenuIcon, CloseIcon } from "../components";
import logo from '../assets/logo.png';
const Navbar = () => {

  const [menu, setMenu] = useState(true);

  const handleClick = () => {
    setMenu(!menu);
  }

  return (
    <nav className="navbar-items">
    
      <h1 className="navbar-logo">
          Cryptonian
      </h1>
      <img className="logo" src={logo} alt="logo"/>
      <div className="menu-icon" onClick={() => handleClick()}>
        {!menu ? <MenuIcon /> : <CloseIcon />}
      </div>
      <ul className={menu ? "nav-menu active" : "nav-menu"}>
        <li key="1" className="nav-links">
          <a href="#">
            Home
          </a>
        </li>
        <li key="2" className="nav-links">
          <a href='/cryptocurrencies'>Cryptocurrencies</a>
        </li>
        <li key="3" className="nav-links">
          <a href='/news'>News</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
