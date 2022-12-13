function mysqlapi() {
  const mysqlget = (url) => {
    return fetch(`${url}`, {
      type: "GET",
    }).then((res) => res.json());
  };

  const mysqlpost = (url) => {
    return fetch(`${url}`, {
      type: "POST",
    }).then((res) => res.json());
  };

  const mysqlupdate = (url) => {
    return fetch(`${url}`, {
      type: "PUT",
    }).then((res) => res.json());
  };

  return {
    mysqlget,
    mysqlpost,
    mysqlupdate,
  };
}

export default mysqlapi();
