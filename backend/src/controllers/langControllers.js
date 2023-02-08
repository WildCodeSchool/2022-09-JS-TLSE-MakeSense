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
const alllang = (req, res) => {
  models.lang_active
    .allLangList()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const { body } = req;
  models.lang_active
    .insert(body)
    .then(() => {
      res.send("?tools=Languages?ok");
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const { body } = req;
  // TODO validations (length, format...)
  models.lang_active
    .update(body)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  alllang,
  langlist,
  add,
  edit,
};
