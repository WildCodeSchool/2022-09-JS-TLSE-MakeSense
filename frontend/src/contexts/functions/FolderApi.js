import api from "../../services/api";

export async function LoadFolder(folder, folder2) {
  const body = {
    folders: [folder, folder2],
  };
  return api
    .apipostmysql(`${import.meta.env.VITE_BACKEND_URL}` / readfs, body)
    .then((json) => {
      return json;
    });
}
