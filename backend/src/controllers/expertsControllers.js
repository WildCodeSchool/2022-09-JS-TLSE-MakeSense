const models = require("../models");

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
  add,
};
