const models = require("../models");

const langlist = (req, res) => {
  models.lang_active
    .findLangList()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  langlist,
};
