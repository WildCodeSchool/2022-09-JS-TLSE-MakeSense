function api() {
  console.log("un appel api en plus");

  let token;
  const checktoken = () => {
    if (
      document.cookie.match(
        /^(.*;)?\s*makesense_access_token\s*=\s*[^;]+(.*)?$/
      )
    ) {
      token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("makesense_access_token="))
        ?.split("=Bearer%20")[1];
    }
  };

  const apigetmysql = async (url) => {
    checktoken();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": import.meta.env.VITE_BACKEND_URL,
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
    });
    return await res.json();
  };

  const apipostmysql = async (url, body) => {
    checktoken();
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": import.meta.env.VITE_BACKEND_URL,
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(body), // body data type must match "Content-Type" header
      credentials: "include",
    });
    return await res;
  };

  return {
    apigetmysql,
    apipostmysql,
  };
}

export default api();
