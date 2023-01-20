const models = require("../models");

const browse = (req, res) => {
  models.comments
    .findAll()
    .then(([rows]) => {
      res.status(204).send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseWithDecisionId = (req, res) => {
  models.comments
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

const edit = (req, res) => {
  const comments = req.body;

  // TODO validations (length, format...)

  comments.id = parseInt(req.params.id, 10);

  models.comments
    .update(comments)
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

const add = (req, res) => {
  const comments = req.body;

  models.comments
    .insert(comments)
    .then(([result]) => {
      res.location(`/comments/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.comments
    .delete(req.params.id)
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
  browse,
  browseWithDecisionId,
  edit,
  add,
  destroy,
};
