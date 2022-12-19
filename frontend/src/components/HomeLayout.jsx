import { useContext } from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import AppBar from "./header/AppBar";
import { LanguageContext } from "../contexts/Language";
import { FolderContext } from "../contexts/Folder";

export default function HomeLayout() {
  const { pages, components } = useContext(FolderContext);
  const { user } = useAuth();
  const outlet = useOutlet();
  const { Text, dictionary } = useContext(LanguageContext);

  // Creation pages
  let menu = [];
  Object.keys(pages.Home).forEach((item) => {
    const addmenu = {
      label: dictionary[item.toLowerCase()]
        ? dictionary[item.toLowerCase()]
        : `${item}`,
      path: `${item.replace("Home", "").toLowerCase()}`,
    };
    menu = [...menu, addmenu];
  });

  // Si connecté redirige vers profile page
  if (user) {
    return <Navigate to="/user/profile" replace />;
  }

  return (
    <div>
      <header>
        <AppBar menu={menu} />
      </header>
      {outlet}
    </div>
  );
}
