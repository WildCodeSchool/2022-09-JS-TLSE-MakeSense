import { useContext } from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import AppBar from "./header/AppBar";
import { LanguageContext } from "../contexts/Language";

export default function HomeLayout() {
  const { user } = useAuth();
  const outlet = useOutlet();
  const { dictionary } = useContext(LanguageContext);

  if (user) {
    return <Navigate to="/user/profile" replace />;
  }

  return (
    <div>
      <header>
        <AppBar
          pages={[
            { label: dictionary.home, path: "/" },
            { label: dictionary.login, path: "/login" },
          ]}
        />
      </header>
      {outlet}
    </div>
  );
}
