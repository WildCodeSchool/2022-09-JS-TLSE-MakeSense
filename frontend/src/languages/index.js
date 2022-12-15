import api from "../services/api";

export function LoadSqlLang() {
  const List = {};
  const Options = {};
  return api
    .apimysql(`${import.meta.env.VITE_BACKEND_URL}/lang`, "GET")
    .then((json) => {
      json.forEach((element) => {
        (List[element.iso_639_1.toString()] = element.json),
          (Options[element.iso_639_1.toString()] = element.name);
      });
      return { List, Options };
    });
}
