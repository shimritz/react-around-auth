import React from "react";
import logo from "../images/Vectorlogo.svg";

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Around The U.S." />
      {/* <button className="header__signup">Sign up</button> */}
    </header>
  );
}

export default Header;
