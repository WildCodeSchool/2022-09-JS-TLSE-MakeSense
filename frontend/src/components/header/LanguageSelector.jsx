import React, { useContext } from "react";
import { LanguageContext } from "../../contexts/Language";

export default function LanguageSelector() {
  const { userLanguage, userLanguageChange, languageOptions } =
    useContext(LanguageContext);

  // set selected language by calling context method
  const handleLanguageChange = (e) => {
    userLanguageChange(e.target.value);
  };

  return (
    <select
      onChange={handleLanguageChange}
      value={userLanguage}
      className="border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 m-4"
    >
      {Object.entries(languageOptions).map(([id, name]) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
}
