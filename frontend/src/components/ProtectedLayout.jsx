import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import AppBar from "./header/AppBar";

export default function ProtectedLayout() {
  const { user } = useAuth();
  const outlet = useOutlet();
  const props = [
    { label: "Settings", path: "settings" },
    { label: "Profile", path: "profile" },
  ];

  if (!user) {
    return <Navigate to="/" />;
  }
  if (user.admin) {
    // eslint-disable-next-line react/prop-types
    props.push({ label: "Admin", path: "admin" });
  }

  return (
    <div>
      <AppBar pages={props} />
      {outlet}
    </div>
  );
}
