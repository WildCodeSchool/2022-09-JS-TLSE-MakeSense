import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import AppBar from "./header/AppBar";

export default function ProtectedLayout() {
  const { user } = useAuth();
  const outlet = useOutlet();

  // Si NON connecté redirige vers Home
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <header>
        <AppBar
          pages={[
            { label: "Settings", path: "settings" },
            { label: "Profile", path: "profile" },
          ]}
        />
      </header>
      {outlet}
    </div>
  );
}
