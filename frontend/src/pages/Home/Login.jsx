import * as React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { Text } from "../../contexts/Language";
import "../../assets/css/App.css";
import PointExclamation from "../../assets/img/point_exclamation.svg";

function LoginPage() {
  const { login } = useAuth();

  // Clic du Submit //
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login({
      email: data.get("email"),
      password: data.get("password"),
      admin: data.get("admin"),
    });
  };

  return (
    <div className="wrapper">
      <div className="login">
        <h1>Log In</h1>
        <img src={PointExclamation} alt="point_exclamation" />

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">Enter your email: </label>
          <input
            required
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <br />
          <label htmlFor="password">Enter your password: </label>
          <input
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <br />
          <label htmlFor="admin">Are you admin ?</label>
          <input
            required
            name="admin"
            label="Admin"
            type="checkbox"
            id="admin"
          />
          <br />

          <button type="submit">Login In</button>
          <div>
            <Link to="/register">Don't have an account? Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;
