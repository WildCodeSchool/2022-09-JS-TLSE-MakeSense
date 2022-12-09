import { useState } from "react";

const useLocalStorage = (keyName, defaultValue) => {

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName); // créer un constante // verifie sur le localstorage l'existence
        if (value) { // Si des preferences existe sur le localstorage
          return JSON.parse(value);
        }
      window.localStorage.setItem(keyName, JSON.stringify(defaultValue)); // créer une clé par defaut sur l'ordinateur
      return defaultValue;
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      <p>{err}</p>;
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
