import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../contexts/useAuth";
import LanguageSelector from "./LanguageSelector";
import { Text, LanguageContext } from "../../contexts/Language";
import "../../assets/css/header/AppBar.css";
import logo from "../../assets/img/logo-makesense.png";

function AppBar({ menu }) {
  // CONST //
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Handle (Toogle) Menu Open Close //
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = (path) => {
    setAnchorElNav(null);
    if (path) {
      navigate(path);
    }
  };

  // RETURN //
  return (
    <div className="wrap-header">
      <img src={logo} alt="logo" className="logo" />
      <div className="menu">
        {menu?.map((page, index) => (
          <div className="wrapper-menu" key={`wrapper-${page.label}`}>
            <button
              type="button"
              key={page.label}
              id={page.label}
              onClick={() => {
                handleCloseNavMenu(page.path);
              }}
            >
              <Text tid={page.label} />
            </button>
            <div key={`bean${page.label}`} className="bean" />
          </div>
        ))}
        {!!user && (
          <button type="button" key="logout" onClick={logout}>
            <Text tid="logout" />
          </button>
        )}
      </div>
      <LanguageSelector />
    </div>
  );
}
export default AppBar;

AppBar.propTypes = {
  menu: PropTypes.instanceOf(Array).isRequired,
};
