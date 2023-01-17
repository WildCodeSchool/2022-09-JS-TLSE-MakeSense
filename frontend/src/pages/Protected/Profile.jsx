import "@assets/css/container/admin/profile.css";
import api from "@services/api";
import Register from "@pages/Home/Register";
import { React, useContext, useState, useEffect } from "react";

const userId = 24;

export default function ProfilePage() {
  const [userFirstName, setUserFistName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();

  useEffect(() => {
    const getUser = async () => {
      // get the user
      const callUserById = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`
      );
    };
  }, []);

  return (
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
              <div>Email du user</div>
              <button type="button">Modifier l'email</button>
            </div>
            <div>
              <div>Nom</div>
              <div>Nom du user</div>
              <button type="button">Modifier le nom</button>
            </div>
            <div>
              <div>Mot de passe</div>
              <button type="button">Modifier le mot de passe</button>
            </div>
          </details>
          <details>
            <summary>Mes groupes</summary>
            <div>Groupes...</div>
            <button type="button">Demander à modifier mes groupes</button>
          </details>
        </div>
      </div>
    </>
  );
}
