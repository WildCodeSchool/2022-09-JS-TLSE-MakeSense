import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Text } from "../../../contexts/Language";

function AdminBar({ menuadmin, tools }) {
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
    <div className="menuadmin">
      <div className="md:flex md:w-64 md:flex-col h-full">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <nav className="bg-gray-50 border-r border-gray-200 pb-4 flex flex-col flex-grow overflow-y-auto">
          <div className="flex-grow mt-5">
            {menuadmin.map((page) => (
              <button
                className={
                  page.label === tools
                    ? "font-bold text-xl text-calypso border-l-4 border-broom pl-5 py-5"
                    : "font-bold text-m border-transparent text-gray-600 hover:text-calypso border-l-4 py-2 px-3 flex items-center py-5"
                }
                type="button"
                key={page.label}
                id={page.label}
                onClick={() => {
                  handleCloseNavMenu(page.path);
                }}
              >
                <Text tid={page.label} />
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
export default AdminBar;

AdminBar.propTypes = {
  tools: PropTypes.string.isRequired,
  menuadmin: PropTypes.instanceOf(Array).isRequired,
};
