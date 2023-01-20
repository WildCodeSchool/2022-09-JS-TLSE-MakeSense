import { React, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../contexts/useAuth";
// eslint-disable-next-line import/no-unresolved
import "@assets/css/container/home/Login.css";
// eslint-disable-next-line import/order, import/no-unresolved
import logo from "@assets/img/point_exclamation.svg";
// eslint-disable-next-line import/order, import/no-unresolved
import connexion from "@assets/img/photo-connexion.svg";

export default function LoginPage() {
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputemail = e.target.email;
    const regex1 = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const inputpassword = e.target.password;
    const regex2 =
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    if (regex1.test(inputemail.value)) {
      if (regex2.test(inputpassword.value)) {
        const email = inputemail.value;
        const password = inputpassword.value;
        const body = { email, password };
        const sendForm = async () => {
          const reslogin = await api.apipostmysql(
            `${import.meta.env.VITE_BACKEND_URL}/login`,
            body
          );
          const cookieValue = await document.cookie
            .split("; ")
            .find((row) => row.startsWith("makesense_access_token="))
            ?.split("=")[1];
          const jsonadmin = await reslogin.json();
          login({
            admin: jsonadmin.admin,
            email,
            id: jsonadmin.id,
          });
        };
        sendForm();
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login">
        <h1>Log In</h1>
        <div className="login-layout">
          <h2>Une décision pleine de sens prise tous ensemble </h2>
          <form className="form" onSubmit={handleSubmit}>
            <img src={connexion} alt="profil" />
            <input
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              placeholder="Email"
              required
              id="email"
              name="email"
              type="email"
              label="Email Address"
              autoComplete="email"
            />
            <span className="form__error">email erroné</span>
            <input
              pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
              placeholder="Password"
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <span className="form__error">
              Format : <br />
              Minimum 8 caracteres, une majuscule, une minuscule, un chiffre, un
              caractère spécial
            </span>
            <button type="submit">Submit</button>
            <div>
              <Link to="/register">Don't have an account yet? Sign Up</Link>
            </div>
          </form>

          <img src={logo} alt="logo" width="200px" />
        </div>
      </div>
    </div>
  );
}
