import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../contexts/useAuth";
import { Text, LanguageContext } from "../../contexts/Language";
import "../../assets/css/header/AppBar.css";
import logo from "../../assets/img/logo-makesense.png";

function FooterBar() {
  return (
    <div className="wrap-header">
      <img src={logo} alt="logo" className="logo" />
    </div>
  );
}
export default FooterBar;
