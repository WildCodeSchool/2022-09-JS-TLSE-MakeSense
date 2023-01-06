import { useContext, Suspense } from "react";
import { Navigate, useOutlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import AppBar from "./header/AppBar";
import AdminBar from "./container/admin/AdminBar";
import FooterBar from "./footer/FooterBar";
import { LanguageContext } from "../contexts/Language";
import { FolderContext } from "../contexts/Folder";
import "../assets/css/Layout.scss";
import Loader from "../services/Loader";

export default function AdminLayout() {
  const { user } = useAuth();
  const outlet = useOutlet();
  const { dictionary } = useContext(LanguageContext);
  const { pages, components } = useContext(FolderContext);

  const URLParam = useLocation().search;
  const tools = new URLSearchParams(URLParam).get("tools")
    ? new URLSearchParams(URLParam).get("tools")
    : "Dashboard";

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
  // Creation menuadmin
  let menuadmin = [];
  Object.keys(components.container.Admin)
    .filter((item) => item !== "AdminBar")
    .forEach((item) => {
      const labelcomponents = item.toLowerCase();
      const addmenuadmin = {
        label: dictionary.labelcomponents
          ? dictionary.item.toLowerCase()
          : `${item}`,
        path: `/admin/dashboard?tools=${item}`,
      };
      menuadmin = [...menuadmin, addmenuadmin];
    });

  if (!user.email) {
    return <Navigate to="/" />;
  }
  if (user.email && !user.admin) {
    return <Navigate to="../user/profile" />;
  }

  return (
    <main className="container">
      <header className="header">
        <AppBar menu={menu} />
      </header>
      <div className="content">
        <div className="admin-wrapper">
          <div className="menu-admin">
            <AdminBar menuadmin={menuadmin} />
          </div>
          <div className="admin-tools-container">
            <Suspense fallback={<div>Loading...</div>}>
              <Loader
                foldername="components/container/Admin"
                filename={tools}
              />
            </Suspense>
          </div>
        </div>
      </div>
      <footer className="footer">
        <FooterBar />
      </footer>
    </main>
  );
}
