import "@assets/css/container/admin/profile.css";
import api from "@services/api";
import Register from "@pages/Home/Register";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { id } from "date-fns/locale";
import Spinner from "@components/Spinner";
import { useAuth } from "../../contexts/useAuth";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState("");
  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [update, setUpdate] = useState(false);
  const { user } = useAuth();
  let serviceId = null;

  useEffect(() => {
    const getUserData = async () => {
      const getUser = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`
      );
      setData(getUser);
      setIsLoaded(true);
      setUserEmail(getUser.email);
      setUserFirstName(getUser.firstname);
      setUserLastName(getUser.lastname);
      serviceId = getUser.serviceId ? getUser.serviceId : null;
    };
    getUserData(); // lance la fonction getUserData
  }, [update]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {
      firstname: userFirstName,
      lastname: userLastName,
      email: userEmail,
      password: userPassword,
      serviceId,
      admin: user.admin,
    };

    const updateUserData = async () => {
      const updateUser = await api.apiputmysql(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`,
        body
      );
      if (updateUser.status === 204) {
        setUpdate(true);
      }
    };
    updateUserData();
    navigate("/user/profile", { replace: true });
    setShowInput(!showInput);
  };

  return isLoaded ? (
    <>
      <h1>Mon profil</h1>
      <div className="profileLayout">
        <div>
          <img src="/" alt="user logo" />
          <button type="button">Charger une photo</button>
        </div>
        <div>
          <details>
            <summary>Informations personnelles</summary>
            <div>
              <div>Email</div>
              <div>Email du user: {data.email} </div>
              {showInput && (
                <input
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={userEmail}
                  onChange={(event) => setUserEmail(event.target.value)}
                />
              )}
            </div>
            <div>
              <div>Nom</div>
              <div>Nom du user: {data.lastname}</div>
              {showInput && (
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  defaultValue={userLastName}
                  onChange={(event) => setUserLastName(event.target.value)}
                />
              )}
              <div>Prénom</div>
              <div>Prénom du user: {data.firstname}</div>
              {showInput && (
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  defaultValue={userFirstName}
                  onChange={(event) => setUserFirstName(event.target.value)}
                />
              )}
            </div>
            <div>
              <div>Mot de passe</div>
              {showInput && (
                <input
                  pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                  type="password"
                  id="passwword"
                  name="password"
                  defaultValue={userPassword}
                  onChange={(event) => setUserPassword(event.target.value)}
                  required
                />
              )}
            </div>
            {showInput && (
              <button type="button" onClick={handleSubmit}>
                Valider mes informations personnelles
              </button>
            )}
            <button type="button" onClick={() => setShowInput(!showInput)}>
              {" "}
              {showInput
                ? "Revenir à mon profil"
                : "Modifier mes informations personnelles"}
            </button>
          </details>
          <details>
            <summary>Mes groupes</summary>
            <div>Groupes...</div>
            <button type="button">Demander à modifier mes groupes</button>
          </details>
        </div>
      </div>
    </>
  ) : (
    <Spinner />
  );
}
