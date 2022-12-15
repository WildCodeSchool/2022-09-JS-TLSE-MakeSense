import AdminPage from "@pages/Admin";
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import AppBar from "./header/AppBar";

export default function AdminLayout() {
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
          { label: "Settings", path: "settings" },
          { label: "Profile", path: "profile" },
          { label: "Admin", path: "dashboard" },
        ]}
      />
      {outlet}
    </>
  );
}
