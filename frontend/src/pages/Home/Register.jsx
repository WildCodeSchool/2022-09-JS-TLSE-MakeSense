import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import api from "../../services/api";
import { Text, LanguageContext } from "../../contexts/Language";
import "@assets/css/container/home/Login.css";

function RegisterPage() {
  const { login } = useAuth();
  // Clic du Submit //
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
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
      // console.log(body);
      const sendForm = async () => {
        const resRegister = await api.apipostmysql(
          `${import.meta.env.VITE_BACKEND_URL}/register`,
          body
        );
        // console.log(resRegister);
        const cookieValue = await document.cookie
          .split("; ")
          .find((row) => row.startsWith("makesense_access_token="))
          ?.split("=")[1];
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
      // const dontSendForm = async () =>
      //   await api.apipostmysql(
      //     `${import.meta.env.VITE_BACKEND_URL}/register`,
      //     body
      //   );
      // console.log(inputPassword.value);
      alert("The password and/or the email are incorrect");
      // dontSendForm();
      // navigate("/register");
    }
  };

  return (
    <div className="wrapper">
      <div className="register">
        <h1>
          <Text tid="register" />
        </h1>

        <form noValidate onSubmit={handleSubmit}>
          <label htmlFor="firstname">Prénom: </label>
          <input
            margin="normal"
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
            margin="normal"
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
            margin="normal"
            required
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <br />
          <label htmlFor="password">Mot de passe: </label>
          <input
            pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
            margin="normal"
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
export default RegisterPage;
