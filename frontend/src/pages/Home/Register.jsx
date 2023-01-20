import * as React from "react";
import { Navigate, redirect } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import api from "../../services/api";
import { Text } from "../../contexts/Language";
// eslint-disable-next-line import/no-unresolved
import "@assets/css/container/home/Login.css";
// eslint-disable-next-line import/order, import/no-unresolved
import logo from "@assets/img/point_exclamation.svg";

function LoginPage() {
  const { login } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputEmail = e.target.email;
    const regex1 = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const inputPassword = e.target.password;
    const regex2 =
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    if (regex1.test(inputEmail.value) && regex2.test(inputPassword.value)) {
      const email = inputEmail.value;
      const password = inputPassword.value;
      const firstname = e.target.firstname.value;
      const lastname = e.target.lastname.value;
      const body = {
        firstname,
        lastname,
        email,
        password,
        serviceId: null,
        admin: 0,
      };
      const sendForm = async () => {
        const resRegister = await api.apipostmysql(
          `${import.meta.env.VITE_BACKEND_URL}/register`,
          body
        );
        if (resRegister.status === 201) {
          const body2 = { email, password };
          const reslogin = await api.apipostmysql(
            `${import.meta.env.VITE_BACKEND_URL}/login`,
            body2
          );
          login({
            admin: 0,
            email,
          });
        }
      };
      sendForm();
    } else if (
      regex1.test(inputEmail.value) === !true ||
      regex2.test(inputPassword.value) === !true
    ) {
      const email = inputEmail.value;
      const password = inputPassword.value;
      const firstname = e.target.firstname.value;
      const lastname = e.target.lastname.value;
      const body = {
        firstname,
        lastname,
        email,
        password,
        serviceId: null,
        admin: 0,
      };
    }
  };

  return (
    <div className="wrapper">
      <div className="login">
        <h1>Register </h1>
        <img src={logo} alt="logo" width="200px" />

        <form noValidate onSubmit={handleSubmit}>
          <label htmlFor="firstname">Prénom: </label>
          <input
            required
            name="firstname"
            label="Firstname"
            type="firstname"
            id="firstname"
            autoComplete="current-firstname"
          />
          <br />
          <label htmlFor="lastname">Nom de famille: </label>
          <input
            required
            name="lastname"
            label="Lastname"
            type="lastname"
            id="lastname"
            autoComplete="current-lastname"
          />
          <br />
          <label htmlFor="email">Email: </label>
          <input
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            required
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <br />
          <label htmlFor="password">Enter your password: </label>
          <input
            pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <br />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;
