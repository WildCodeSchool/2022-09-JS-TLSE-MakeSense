import * as React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

function LoginPage() {
  const { login } = useAuth();

  // Clic du Submit //
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <div className="wrapper">
      <div className="login">
        <h1>Log In</h1>

        <form onSubmit={handleSubmit} noValidate>
          <input
            margin="normal"
            required
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <input
            margin="normal"
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login In
          </button>
          <div>
            <Link to="/register">Don't have an account? Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;
