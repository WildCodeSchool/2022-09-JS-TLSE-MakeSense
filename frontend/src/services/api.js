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
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(body), // body data type must match "Content-Type" header
    });
    return await res.json();
  };

  return {
    apigetmysql,
    apipostmysql,
  };
}

export default api();
