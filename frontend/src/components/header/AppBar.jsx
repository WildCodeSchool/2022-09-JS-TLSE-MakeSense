import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../contexts/useAuth";
import LanguageSelector from "./LanguageSelector";
import { Text } from "../../contexts/Language";
import logo from "../../assets/img/logo-makesense.png";

function AppBar({ menu }) {
  // CONST //
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [userMenu, setUserMenu] = useState(false);
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
    <>
      <div className="bg-slate-200 flex flex-row justify-between items-center">
        <a
          href="https://makesense.org/"
          className="text-blueDiane hover:text-calypso font-medium text-l px-5"
        >
          Retourner au site de makesense
        </a>
        <LanguageSelector />
      </div>
      <nav className="bg-white w-full py-6 z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
        <div className="pl-5">
          <button
            type="button"
            onClick={() => {
              navigate(`/user`);
            }}
          >
            <img src={logo} className="h-6 mr-3 sm:h-9" alt="Makesense Logo" />
          </button>
        </div>
        <div className="flex ">
          {menu?.map((page, index) => (
            <div className="wrapper-menu" key={`wrapper-${page.label}`}>
              <button
                type="button"
                key={page.label}
                id={page.label}
                onClick={() => {
                  handleCloseNavMenu(page.path);
                }}
                className="text-blueDiane hover:text-calypso font-bold text-xl px-5"
              >
                <Text tid={page.label} />
              </button>
            </div>
          ))}
        </div>
        {!!user.email && (
          <div className="flex">
            <button
              type="button"
              className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              onClick={() => {
                navigate(`/user/decisions?comp=Form`);
              }}
            >
              <Text tid="add" />
            </button>
            <div className="flex flex-col items-end mx-4">
              <button
                type="button"
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
                onClick={() => setUserMenu(!userMenu)}
                onKeyDown={() => setUserMenu(!userMenu)}
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://randomuser.me/api/portraits/women/2.jpg"
                  alt="user logo"
                />
              </button>
              {userMenu && (
                <div
                  className="fixed my-10 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {user.firstname} {user.lastname}
                    </span>
                    <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                      {user.email}
                    </span>
                  </div>
                  <ul className="py-1" aria-labelledby="user-menu-button">
                    <li>
                      <a
                        href="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Mes décisions
                      </a>
                    </li>
                    {!!user.email && (
                      <li>
                        <button
                          type="button"
                          key="logout"
                          onClick={() => logout()}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          <Text tid="logout" />
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
export default AppBar;

AppBar.propTypes = {
  menu: PropTypes.instanceOf(Array).isRequired,
};
