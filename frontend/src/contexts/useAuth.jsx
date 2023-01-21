import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../services/api";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    admin: null,
    email: null,
    firstname: null,
    lastname: null,
    id: null,
  });
  const navigate = useNavigate();

  const checkToken = async (id) => {
    const checkuser = await api.apigetmysql(
      `${import.meta.env.VITE_BACKEND_URL}/users/${id}`
    );
    setUser({
      admin: checkuser.admin,
      email: checkuser.email,
      firstname: checkuser.firstname,
      lastname: checkuser.lastname,
      id,
    });
  };

  // reconnexion peuple user
  if (
    !user.email &&
    document.cookie.match(/^(.*;)?\s*makesense_access_token\s*=\s*[^;]+(.*)?$/)
  ) {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("makesense_access_token="))
      ?.split("=Bearer%20")[1];
    const payload = JSON.parse(window.atob(token.match(/(?<=\.)(.*?)(?=\.)/g)));
    checkToken(payload.sub);
  }

  const login = async (data) => {
    setUser(data);
    navigate("/user/profile", { replace: true });
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
      setUser,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
