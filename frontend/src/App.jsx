import "./assets/css/App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import LanguageSelector from "./components/LanguageSelector";

function App() {
  return (
    <>    
      <header className="App-header">
        <div className="App">
          <LanguageSelector />
          <nav>
            <Link to="/">Home</Link>
          </nav>
        </div>
      </header>
      <main>
        <p>MakeSense BIENVENUE SUPER JE PETE UN PLOMB</p>
        <Routes element={<Home />}>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <footer />
    </>
  );
}

export default App;
