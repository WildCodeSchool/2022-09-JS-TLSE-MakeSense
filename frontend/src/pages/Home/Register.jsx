import * as React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import api from "../../services/api";
import { Text, LanguageContext } from "../../contexts/Language";

function RegisterPage() {
  const { login } = useAuth();

  // Clic du Submit //
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    login({
      email: data.get("email"),
      password: data.get("password"),
    });
    const inputemail = e.target.email;
    const regex1 = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const inputpassword = e.target.password;
    const regex2 =
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    if (regex1.test(e.target.email)) {
      if (regex2.test(e.target.password)) {
        const email = inputemail.value;
        const password = inputpassword.value;
        const body = { email, password };

        const sendForm = async () => {
          const reslogin = await api.apipostmysql(
            `${import.meta.env.VITE_BACKEND_URL}/login`,
            body
          );
          // console.log(password);
          // const cookieValue = await document.cookie
          //   .split("; ")
          //   .find((row) => row.startsWith("makesense_access_token="))
          //   ?.split("=")[1];
          // const jsonadmin = await reslogin.json();
          // login({
          //   admin: jsonadmin.admin,
          //   email,
          // });
        };
        sendForm();
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="register">
        <h1>
          <Text tid="register" />
        </h1>

        <form onSubmit={handleSubmit} noValidate>
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
          <button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
export default RegisterPage;
