import * as React from "react";
import { useAuth } from "../../contexts/useAuth";
import api from "../../services/api";
import { Text } from "../../contexts/Language";

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
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8">
      <div className="register">
        <h1 className="text-xl font-medium text-gray-900">Register</h1>

        <form noValidate className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="firstname"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Prénom
            </label>
            <input
              required
              name="firstname"
              label="Firstname"
              type="firstname"
              id="firstname"
              autoComplete="current-firstname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nom de famille
            </label>
            <input
              required
              name="lastname"
              label="Lastname"
              type="lastname"
              id="lastname"
              autoComplete="current-lastname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              required
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;
