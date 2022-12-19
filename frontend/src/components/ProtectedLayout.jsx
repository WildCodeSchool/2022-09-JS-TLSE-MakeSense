import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import AppBar from "./header/AppBar";
import { LanguageContext } from "../contexts/Language";

export default function ProtectedLayout() {
  const { user } = useAuth();
  const outlet = useOutlet();
  const { dictionary } = useContext(LanguageContext);

  // Si NON connecté redirige vers Home
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <header>
        <AppBar
          pages={[
            { label: dictionary.settings ? dictionary.settings : "Settings", path: "../user/settings" },
            { label: dictionary.profile ? dictionary.settings : "Profile", path: "../user/profile" },
          ]}
        />
      </header>
      {outlet}
    </div>
  );
}
