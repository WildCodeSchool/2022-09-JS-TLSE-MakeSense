import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-cycle
import { LoadUser } from "./functions/ReconnectApi";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState({
    admin: null,
    email: null,
    firstname: null,
    lastname: null,
    id: null,
    avatar_url: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // reconnexion peuple user
    if (
      !user.email &&
      document.cookie.match(
        /^(.*;)?\s*makesense_access_token\s*=\s*[^;]+(.*)?$/
      )
    ) {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("makesense_access_token="))
        ?.split("=Bearer%20")[1];
      const payload = JSON.parse(
        window.atob(token.match(/(?<=\.)(.*?)(?=\.)/g))
      );
      LoadUser(payload.sub).then((returnuser) => {
        if (returnuser.status === 401) {
          setUser({
            admin: null,
            email: null,
            firstname: null,
            lastname: null,
            id: null,
            avatar_url: null,
          });
          navigate("/", { replace: true });
        } else {
          setUser({
            admin: returnuser.admin,
            email: returnuser.email,
            firstname: returnuser.firstname,
            lastname: returnuser.lastname,
            id: returnuser.id,
            avatar_url: returnuser.avatar_url,
          });
        }
        setIsLoaded(true);
      });
    } else {
      setIsLoaded(true);
    }
  }, []);

  const login = async (data) => {
    setUser(data);
    navigate("/user/decisions", { replace: true });
  };

  const logout = () => {
    document.cookie =
      "makesense_access_token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    setUser("user", null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {isLoaded && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
