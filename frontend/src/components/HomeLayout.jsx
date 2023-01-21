import { useContext } from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import AppBar from "./header/AppBar";
import FooterBar from "./footer/FooterBar";
import { LanguageContext } from "../contexts/Language";
import { FolderContext } from "../contexts/Folder";

export default function HomeLayout() {
  const { pages } = useContext(FolderContext);
  const { user } = useAuth();
  const outlet = useOutlet();
  const { Text, dictionary } = useContext(LanguageContext);

  const location = localStorage.getItem("location");
  // Si connecté redirige vers profile page
  if (user.email) {
    return <Navigate to={location || "/user/profile"} replace />;
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
    <main>
      <header>
        <AppBar menu={menu} />
      </header>

      <div className="flex flex-row justify-center items-center">{outlet}</div>

      <footer className="footer">
        <FooterBar />
      </footer>
    </main>
  );
}
