import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || "/";

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");

    auth.signin(username, () => {
      /** navigate the user back to the screen they are coming from
      and prevent navigating back to the login screen by setting replace to true */
      navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
