import { useContext } from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import AppBar from "./header/AppBar";
import FooterBar from "./footer/FooterBar";
import { LanguageContext } from "../contexts/Language";
import { FolderContext } from "../contexts/Folder";
import "../assets/css/Layout.scss";

export default function ProtectedLayout() {
  const { pages, components } = useContext(FolderContext);
  const { user } = useAuth();
  const outlet = useOutlet();
  const { dictionary } = useContext(LanguageContext);

  // Creation pages
  let menu = [];
  Object.keys(pages.Protected).forEach((item) => {
    const labelpage = item.toLowerCase();
    const addmenu = {
      label: dictionary.labelpage ? dictionary.item.toLowerCase() : `${item}`,
      path: `/user/${item.toLowerCase()}`,
    };
    menu = [...menu, addmenu];
  });

  if (user.admin)
    // Pages add admin
    Object.keys(pages.Admin).forEach((item) => {
      const labelpage = item.toLowerCase();
      const addmenu = {
        label: dictionary.labelpage ? dictionary.item.toLowerCase() : `${item}`,
        path: `/admin/${item.toLowerCase()}`,
      };
      menu = [...menu, addmenu];
    });

  // Si NON connecté redirige vers Home
  if (!user.email) {
    return <Navigate to="/" />;
  }

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
