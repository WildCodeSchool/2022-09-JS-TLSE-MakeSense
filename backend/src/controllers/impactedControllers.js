const models = require("../models");

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
  add,
};
