import { useContext } from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import AppBar from "./header/AppBar";
import FooterBar from "./footer/FooterBar";
import { LanguageContext } from "../contexts/Language";
import { FolderContext } from "../contexts/Folder";
import "../assets/css/Layout.scss";

export default function HomeLayout() {
  const { pages, components } = useContext(FolderContext);
  const { user, checkToken } = useAuth();
  const outlet = useOutlet();
  const { Text, dictionary } = useContext(LanguageContext);

  // Si connecté redirige vers profile page
  if (user.email) {
    return <Navigate to="/user" replace />;
  }

  // Creation pages
  let menu = [];
  Object.keys(pages.Home).forEach((item) => {
    const addmenu = {
      label: dictionary[item.toLowerCase()]
        ? dictionary[item.toLowerCase()]
        : `${item}`,
      path: `${item.replace("Home", "/").toLowerCase()}`,
    };
    menu = [...menu, addmenu];
  });

  return (
    <main className="container">
      <header className="header">
        <AppBar menu={menu} />
      </header>

      <div className="content">{outlet}</div>

      <footer className="footer">
        <FooterBar />
      </footer>
    </main>
  );
}
