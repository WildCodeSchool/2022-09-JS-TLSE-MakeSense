const models = require("../models");

const read = (req, res) => {
  models.decisions_impacts
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] === undefined) {
        res.status(200).send([]);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const imp = req.body;
  models.decisions_impacts
    .insert(imp)
    .then(([result]) => {
      res.location(`/impacted/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  read,
  add,
};
