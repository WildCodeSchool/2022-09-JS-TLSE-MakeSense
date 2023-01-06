import { createContext, useContext, useMemo, useState } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    admin: null,
    email: null,
  });
  const navigate = useNavigate();

  const login = async (data) => {
    setUser(data);
    if (data.admin === "on") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/user/profile", { replace: true });
    }
  };

  const logout = () => {
    document.cookie =
      "makesense_access_token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    setUser("user", null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
