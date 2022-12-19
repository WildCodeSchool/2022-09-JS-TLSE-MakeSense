import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import AppBar from "./header/AppBar";
// const { pages, components } = useContext(FolderContext);

export default function AdminLayout() {
  // Creation pages

  const { user } = useAuth();
  const outlet = useOutlet();

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
          { label: "Settings", path: "../user/settings" },
          { label: "Profile", path: "../user/profile" },
          { label: "Admin", path: "dashboard" },
        ]}
      />
      {outlet}
    </>
  );
}
