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
    <select
      onChange={handleLanguageChange}
      value={userLanguage}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-4"
    >
      {Object.entries(languageOptions).map(([id, name]) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
}
