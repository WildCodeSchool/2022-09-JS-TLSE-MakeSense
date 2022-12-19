import { useContext } from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import AppBar from "./header/AppBar";
import { LanguageContext } from "../contexts/Language";
import { FolderContext } from "../contexts/Folder";

export default function HomeLayout() {
  const { pages, components } = useContext(FolderContext);
  // Creation pages
  console.log(pages);

  const { user } = useAuth();
  const outlet = useOutlet();
  const { dictionary } = useContext(LanguageContext);

  // Si connecté redirige vers profile page
  if (user) {
    return <Navigate to="/user/profile" replace />;
  }

  return (
    <div>
      <header>
        <AppBar
          pages={[
            { label: dictionary.home ? dictionary.home : "Home", path: "/" },
            { label: dictionary.login ? dictionary.login : "Login", path: "/login" },
          ]}
        />
      </header>
      {outlet}
    </div>
  );
}
