import api from "../../../services/api";

export async function LoadSqlLang() {
  const List = {};
  const Options = {};
  const json = await api.apigetmysql(
    `${import.meta.env.VITE_BACKEND_URL}/lang`
  );
  json.forEach((element) => {
    (List[element.iso_639_1.toString()] = element.json),
      (Options[element.iso_639_1.toString()] = element.name);
  });
  return { List, Options };
}
