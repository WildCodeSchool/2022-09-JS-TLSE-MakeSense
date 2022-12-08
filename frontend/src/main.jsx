import React from "react";
import ReactDOM from "react-dom/client";
import { LanguageProvider } from "./contexts/Language";
import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "./contexts/useAuth";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        {/* <AuthProvider> */}
          <App />
        {/* </AuthProvider> */}
      </BrowserRouter>
    </LanguageProvider>
  </React.StrictMode>
);
