import { useContext } from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import AppBar from "./header/AppBar";
import { LanguageContext } from "../contexts/Language";
import { FolderContext } from "../contexts/Folder";

export default function AdminLayout() {
  const { user } = useAuth();
  const outlet = useOutlet();
  const { dictionary } = useContext(LanguageContext);
  const { pages, components } = useContext(FolderContext);

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
  Object.keys(pages.Admin).forEach((item) => {
    const labelpage = item.toLowerCase();
    const addmenu = {
      label: dictionary.labelpage ? dictionary.item.toLowerCase() : `${item}`,
      path: `/admin/${item.replace("Home", "").toLowerCase()}`,
    };
    menu = [...menu, addmenu];
  });

  if (!user) {
    return <Navigate to="/" />;
  }
  if (!user.admin) {
    return <Navigate to="../user/profile" />;
  }

  return (
    <div className="container">
      <header>
        <AppBar menu={menu} />
      </header>
      {outlet}
      <footer>Hello</footer>
    </div>
  );
}
