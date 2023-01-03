import * as React from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
// import { useAuth } from "../../contexts/useAuth";
// import css from "../../assets/css/container/Login.css";

// const errorColor = [red, setRed];
// const successColor = [green, setGreen];

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  // small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function LoginPage() {
  // const { login } = useAuth();

  function emailControl(input) {
    const regex1 = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;

    if (regex1.test(input)) {
      showSuccess(input);
    } else {
      showError(input, "Email is not valid");
    }
  }

  function passwordControl(input) {
    const regex2 =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (regex2.test(input)) {
      showSuccess(input);
    } else {
      showError(input, "Password is not valid");
    }
  }

  function controlValues(input) {
    if (emailControl && passwordControl) {
      window.localStorage.setItem("formValues", JSON.stringify(input));
    } else {
      showError(input, "Some informations are incorrect");
    }
  }

  return (
    <div className="wrapper">
      <div className="login">
        <h1>Log In</h1>

        <form onSubmit={controlValues}>
          <input
            margin="normal"
            placeholder="Email"
            required
            id="email"
            name="email"
            type="text"
            onChange={emailControl}
            label="Email Address"
            autoComplete="email"
          />
          <input
            margin="normal"
            placeholder="Password"
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            onChange={passwordControl}
            autoComplete="current-password"
          />
          <button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
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
