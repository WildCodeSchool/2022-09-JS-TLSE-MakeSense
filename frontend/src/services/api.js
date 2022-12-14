function api() {
  const apimysql = (url, method) => {
    return fetch(url, {
      type: method,
    }).then((res) => res.json());
  };

  return {
    apimysql,
  };
}

export default api();
