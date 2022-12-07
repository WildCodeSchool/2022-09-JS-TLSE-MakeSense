import React, { useContext } from "react";
import { LanguageContext } from "../contexts/Language";
import UserStatusContext from "../contexts/Auth";

export default function Hello() {
  const { dictionary } = useContext(LanguageContext);
  const { Text } = useContext(LanguageContext);
  const { user, setUser } = useContext(UserStatusContext);

  const handleLogIn = () => setUser({ id: 1, name: "aimach" });
  const handleLogOut = () => setUser(null);

  return (
    <>
      {user ? (
        <button type="button" onClick={handleLogOut}>
          Sign out
        </button>
      ) : (
        <button type="button" onClick={handleLogIn}>
          Sign in
        </button>
      )}
      <h1>
        <Text tid="bonjour" />
      </h1>
      <p>
        <Text tid="welcomeDescription" />
      </p>
      <div>
        <input type="text" placeholder={dictionary.enterText} />
        <button type="button">
          <Text tid="clickMe" />
        </button>
        {/* <p>{clickMe}</p> */}
      </div>
    </>
  );
}
