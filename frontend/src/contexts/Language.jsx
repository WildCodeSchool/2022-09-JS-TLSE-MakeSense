import React, {
  useMemo,
  useState,
  createContext,
  useContext,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import { LoadSqlLang } from "./functions/languages";

// create the language context with default selected language
export const LanguageContext = createContext({});

// it provides the language context to app
export function LanguageProvider({ children }) {
  const defaultLanguage = window.localStorage.getItem("user-lang");
  const [userLanguage, setUserLanguage] = useState(defaultLanguage || "fr");
  const [isLoaded, setIsLoaded] = useState(false);
  const [provider, setProvider] = useState({});

  useEffect(() => {
    setIsLoaded(false);
    LoadSqlLang().then((item) => {
      const dictionaryList = item.List;
      const languageOptions = item.Options;
      setProvider({
        userLanguage,
        dictionary: JSON.parse(dictionaryList[userLanguage]),
        languageOptions,
        userLanguageChange: (selected) => {
          const newLanguage = languageOptions[selected] ? selected : "fr";
          setUserLanguage(newLanguage);
          window.localStorage.setItem("user-lang", newLanguage);
        },
      });
      setIsLoaded(true);
    });
  }, [userLanguage]);

  return (
    <LanguageContext.Provider value={provider}>
      {isLoaded && children}
    </LanguageContext.Provider>
  );
}

// get text according to id & current language
export function Text({ tid }) {
  const languageContext = useContext(LanguageContext);
  return languageContext.dictionary[tid] || tid;
}

LanguageProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
