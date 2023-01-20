import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { LanguageContext } from "../../contexts/Language";

export default function LanguageSelector() {
  const URL = useLocation().pathname;
  const { userLanguage, userLanguageChange, languageOptions } =
    useContext(LanguageContext);

  // set selected language by calling context method
  const handleLanguageChange = (e) => {
    localStorage.setItem("location", URL);
    userLanguageChange(e.target.value);
  };

  return (
    <select onChange={handleLanguageChange} value={userLanguage}>
      {Object.entries(languageOptions).map(([id, name]) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
}
