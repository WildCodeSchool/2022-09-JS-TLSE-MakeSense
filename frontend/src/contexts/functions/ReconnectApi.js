import api from "../../services/api";

export async function LoadUser(id) {
  return api
    .apigetmysql(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`)
    .then((res) => {
      return res;
    });
}
