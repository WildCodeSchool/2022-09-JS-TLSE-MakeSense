import React, {
  useMemo,
  useState,
  createContext,
  useContext,
  useEffect,
} from "react";
import PropTypes from "prop-types";

// import { languageOptions, dictionaryList } from "../languages";
import { LoadSqlLang } from "../languages";

// create the language context with default selected language
export const LanguageContext = createContext({});

// it provides the language context to app
export function LanguageProvider({ children }) {
  const defaultLanguage = window.localStorage.getItem("rcml-lang");
  const [userLanguage, setUserLanguage] = useState(defaultLanguage || "fr");
  const [isLoaded, setIsLoaded] = useState(false);
  const [provider, setProvider] = useState({});

  useEffect(() => {
    LoadSqlLang().then((e) => {
      const dictionaryList = e.List;
      const languageOptions = e.Options;

      setProvider({
        userLanguage,
        dictionary: dictionaryList[userLanguage],
        languageOptions,
        userLanguageChange: (selected) => {
          const newLanguage = languageOptions[selected] ? selected : "en";
          setUserLanguage(newLanguage);
          window.localStorage.setItem("rcml-lang", newLanguage);
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
