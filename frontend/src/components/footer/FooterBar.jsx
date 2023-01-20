import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../contexts/useAuth";
import { Text, LanguageContext } from "../../contexts/Language";
// eslint-disable-next-line import/no-unresolved
import "../../assets/css/header/AppBar.scss";
import logo from "../../assets/img/logo-makesense.png";

function FooterBar() {
  return (
    <div className="wrap-header">
      <img src={logo} alt="logo" className="logo" />
    </div>
  );
}
export default FooterBar;
