import "@assets/css/container/admin/profile.css";

export default function ProfilePage() {
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
