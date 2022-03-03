import React from "react";
import "../index.css";
import RMLogo from "../images/logo.png";

const Header = (props) => {
  return (
    <div className="header">
      <img style={{ maxHeight: "80px" }} src={RMLogo} alt="Logo" />
    </div>
  );
};

export default Header;
