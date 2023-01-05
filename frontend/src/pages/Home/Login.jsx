import { React, useState } from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useAuth } from "../../contexts/useAuth";
import css from "../../assets/css/container/Login.css";

export default function LoginPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn("hello");

    const email = document.getElementById("email");
    const regex1 =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (regex1.test(email.value)) {
      // console.warn("youpi");
    } else {
      // console.warn("Email is not valid");
    }

    const password = document.getElementById("password");
    const regex2 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (regex2.test(password)) {
      // console.log("youpi");
    } else {
      // console.log("Password is not valid");
    }
  };

  // if (emailControl() && passwordControl()) {
  //   window.localStorage.setItem("formValues", JSON.stringify(input));
  // } else {
  //   showError(input, "Some informations are incorrect");
  // }

  return (
    <div className="wrapper">
      <div className="login">
        <h1>Log In</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            margin="normal"
            placeholder="Email"
            required
            id="email"
            name="email"
            type="text"
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
            autoComplete="current-password"
          />
          <button type="submit">Loging In</button>
          <div>
            <Link to="/register">Don't have an account? Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
