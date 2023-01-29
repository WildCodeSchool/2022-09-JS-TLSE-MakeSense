import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../contexts/useAuth";
import { Text } from "../../contexts/Language";

export default function LoginPage() {
  const { login } = useAuth();
  const [errotConnect, setErrotConnect] = useState(false);
  const navigate = useNavigate();

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
          if (reslogin.status === 200) {
            const jsonadmin = await reslogin.json();
            login({
              admin: jsonadmin.admin,
              email,
              id: jsonadmin.id,
            });
          } else {
            setErrotConnect(true);
          }
        };
        sendForm();
      }
    }
  };

  useEffect(() => {}, [setErrotConnect]);

  return errotConnect ? (
    <div
      id="popup-modal"
      tabIndex="-1"
      className="fixed top-0 left-0 right-0 z-50 p-4 h-full overflow-x-hidden overflow-y-auto flex flex-col justify-center items-center backdrop-blur"
    >
      <div className="w-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <div className="p-6 text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              <Text tid="errorconnection" />
            </h3>
            <button
              data-modal-hide="popup-modal"
              type="button"
              className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => {
                setErrotConnect(false);
              }}
            >
              <Text tid="login" />
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8">
      <div className="login">
        <h1 className="text-xl font-medium text-gray-900">Log In</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              placeholder="Email"
              required
              id="email"
              name="email"
              type="email"
              label="Email Address"
              autoComplete="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <span className="form__error">email erroné</span>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your password
            </label>
            <input
              pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
              placeholder="Password"
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <span className="text-rose-500 text-xs">
              Minimum 8 caracteres, une majuscule, une minuscule, un chiffre, un
              caractère spécial.
            </span>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login to your account
          </button>
          <div className="text-sm font-medium text-gray-500">
            Not registered?{" "}
            <span href="#" className="text-blue-700 hover:underline">
              {" "}
              <Link to="/register">Don't have an account yet? Sign Up</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
