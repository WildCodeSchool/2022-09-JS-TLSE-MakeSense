import { useLocation, useNavigate, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../contexts/Auth";

export function AuthStatus() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.user) {
    return <p>Please login to access your todos</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        type="button"
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

export function PrivateRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    /** Redirect them to the /login page, but save the current location they were
       trying to go to when they were redirected. This allows us to send them
      along to that page after they login, which is a nicer user experience
       than dropping them off on the home page. */
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
