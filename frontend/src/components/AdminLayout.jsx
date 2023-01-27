import { useContext, Suspense } from "react";
import { Navigate, useOutlet, useLocation } from "react-router-dom";
import AdminBar from "@components/container/Admin/AdminBar";
import { useAuth } from "../contexts/useAuth";
import AppBar from "./header/AppBar";
import FooterBar from "./footer/FooterBar";
import { LanguageContext } from "../contexts/Language";
import { FolderContext } from "../contexts/Folder";
import Loader from "../services/Loader";
import Spinner from "./Spinner";

export default function AdminLayout() {
  const { user, setUser } = useAuth();
  const { dictionary } = useContext(LanguageContext);
  const { pages, components } = useContext(FolderContext);

  const URLParam = useLocation().search;
  const tools = new URLSearchParams(URLParam).get("tools") ?? "Dashboard";

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
  if (!user.email) {
    return <Navigate to="/" />;
  }
  if (user.email && !user.admin) {
    return <Navigate to="../user/decisions" />;
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

  return (
    <main className="flex flex-col justify-between h-screen">
      <header>
        <AppBar menu={menu} />
      </header>
      <div className="flex flex-row h-full overflow-y-scroll">
        <AdminBar menuadmin={menuadmin} tools={tools} />
        <div className="flex flex-col items-center w-full mt-10">
          <Suspense fallback={<Spinner />}>
            <Loader foldername="components/container/Admin" filename={tools} />
          </Suspense>
        </div>
      </div>
      <footer className="footer">
        <FooterBar />
      </footer>
    </main>
  );
}
