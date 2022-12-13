import mysqlapi from "@services/mysqlapi";

const List = {};
mysqlapi.mysqlget("http://localhost:5000/lang").then((json) => {
  const List = json.data;
  console.log(List);
});

import fr from "./fr.json";
import en from "./en.json";
import de from "./de.json";

export const dictionaryList = { en, fr, de };

export const languageOptions = {
  en: "Anglais",
  fr: "Français",
  de: "Allemand",
};
