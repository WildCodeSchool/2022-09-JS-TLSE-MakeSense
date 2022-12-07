import React, { useMemo } from "react";
import PropTypes from "prop-types";

const AuthContext = React.createContext(null);
export default AuthContext;

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const signin = (newUser, callback) => {
    setUser(newUser);
    callback();
  };

  const signout = (callback) => {
    setUser(null);
    callback();
  };
  const value = useMemo(
    () => ({
      user,
      signin,
      signout,
    }),
    []
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
