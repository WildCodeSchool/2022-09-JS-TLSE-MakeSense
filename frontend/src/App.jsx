import "./assets/css/App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Hello from "./pages/Hello";
import Hello2 from "./pages/Hello2";
import LoginPage from "./pages/LoginPage";
import LanguageSelector from "./components/LanguageSelector";
import AuthProvider from "./contexts/Auth";
import { PrivateRoute } from "./components/AuthStatus";
/// Context
import { LanguageProvider } from "./contexts/Language";

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <header className="App-header">
          <div className="App">
            <LanguageSelector />
            <nav>
              <Link to="/">Home</Link>
              <Link to="/hello">Hello</Link>
              <Link to="/hello2">Hello2</Link>
            </nav>
          </div>
        </header>
        <main>
          <p>MakeSense BIENVENUE SUPER JE PETE UN PLOMB</p>
          <Routes element={<Hello2 />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/hello" element={<Hello />} />
            <Route
              path="/hello2"
              element={
                <PrivateRoute>
                  <Hello2 />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <footer />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
