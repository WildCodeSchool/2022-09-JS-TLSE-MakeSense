import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import AppBar from "./header/AppBar";
import { LanguageContext } from "../contexts/Language";
import { FolderContext } from "../contexts/Folder";

export default function AdminLayout() {

  const { pages, components } = useContext(FolderContext);
  // Creation pages
  

  const { user } = useAuth();
  const outlet = useOutlet();
  const { dictionary } = useContext(LanguageContext);

  if (!user) {
    return <Navigate to="/" />;
  }
  if (!user.admin) {
    return <Navigate to="../user/profile" />;
  }

  return (
    <>
      <AppBar
        pages={[
          { label: dictionary.settings ? dictionary.settings : "Settings", path: "../user/settings" },
          { label: dictionary.profile ? dictionary.settings : "Profile", path: "../user/profile" },
          { label: dictionary.admin ? dictionary.settings : "Admin", path: "dashboard" },
        ]}
      />
      {outlet}
    </>
  );
}
