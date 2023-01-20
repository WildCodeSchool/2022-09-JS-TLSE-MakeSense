const models = require("../models");

const read = (req, res) => {
  models.decisions_impacts
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
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
  const exp = req.body;
  models.decisions_experts
    .insert(exp)
    .then(([result]) => {
      res.location(`/experts/${result.insertId}`).sendStatus(201);
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
