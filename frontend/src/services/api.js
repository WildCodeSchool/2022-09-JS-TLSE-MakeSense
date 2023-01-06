function api() {
  const apigetmysql = async (url) => {
    const res = await fetch(url, {
      method: "GET",
    });
    return await res.json();
  };

  const apipostmysql = async (url, body) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": import.meta.env.VITE_BACKEND_URL,
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
