import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../contexts/useAuth";
import LanguageSelector from "./LanguageSelector";
import { Text, LanguageContext } from "../../contexts/Language";

function AppBar({ menu }) {
  // CONST //
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { dictionary } = useContext(LanguageContext);

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
      <div className="menu">
        {menu?.map((page) => (
          <button
            type="button"
            key={page.label}
            onClick={() => {
              handleCloseNavMenu(page.path);
            }}
          >
            <Text tid={page.label} />
          </button>
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
