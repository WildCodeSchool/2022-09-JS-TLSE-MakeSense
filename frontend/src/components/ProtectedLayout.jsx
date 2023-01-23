import { useContext } from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import AppBar from "./header/AppBar";
import FooterBar from "./footer/FooterBar";
import { LanguageContext } from "../contexts/Language";
import { FolderContext } from "../contexts/Folder";

export default function ProtectedLayout() {
  const { pages } = useContext(FolderContext);
  const { user, setUser } = useAuth();
  const outlet = useOutlet();
  const { dictionary } = useContext(LanguageContext);

  // Si pas de cookies go login
  if (
    !document.cookie.match(/^(.*;)?\s*makesense_access_token\s*=\s*[^;]+(.*)?$/)
  ) {
    setUser({
      admin: null,
      email: null,
      id: null,
    });
    return <Navigate to="/login" />;
  }
  // Si NON connecté redirige vers Home
  if (!user.email) {
    return <Navigate to="/" />;
  }

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

  return (
    <main className="flex flex-col justify-between h-screen">
      <header className="">
        <AppBar menu={menu} />
      </header>
      <div className="">{outlet}</div>
      <footer className="">
        <FooterBar />
      </footer>
    </main>
  );
}
