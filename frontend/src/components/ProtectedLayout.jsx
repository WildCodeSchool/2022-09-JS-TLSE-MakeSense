import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import AppBar from "./header/AppBar";

export default function ProtectedLayout() {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <AppBar
        pages={[
          { label: "Settings", path: "settings" },
          { label: "Profile", path: "profile" },
        ]}
      />
      {outlet}
    </div>
  );
}
