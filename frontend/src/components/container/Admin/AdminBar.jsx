import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Text } from "../../../contexts/Language";
import "../../../assets/css/container/Admin/AdminBar.css";

function AdminBar({ menuadmin }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();
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

  return (
    <div className="wrapper">
      <div className="menuadmin">
        {menuadmin?.map((page, index) => (

          <div className="wrapper-menu" key={`wrapper-${page.label}`}>
            <div key={`bean${page.label}`} className="bean" />
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
          </div>
        ))}
      </div>
    </div>
  );
}
export default AdminBar;

AdminBar.propTypes = {
  menuadmin: PropTypes.instanceOf(Array).isRequired,
};
