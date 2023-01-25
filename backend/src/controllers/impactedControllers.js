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

module.exports = {
  read,
};
