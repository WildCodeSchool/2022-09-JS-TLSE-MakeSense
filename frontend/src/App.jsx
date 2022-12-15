import "./assets/css/App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/HomeLayout/Login";
import RegisterPage from "./pages/HomeLayout/Register";
import HomePage from "./pages/HomeLayout/Home";
import ProfilePage from "./pages/ProtectedLayout/Profile";
import SettingsPage from "./pages/ProtectedLayout/Settings";
import ProtectedLayout from "./components/ProtectedLayout";
import AdminLayout from "./components/AdminLayout";
import AdminPage from "./pages/AdminLayout/Admin";
import HomeLayout from "./components/HomeLayout";

function App() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route path="/user" element={<ProtectedLayout />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="dashboard" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}

export default App;
