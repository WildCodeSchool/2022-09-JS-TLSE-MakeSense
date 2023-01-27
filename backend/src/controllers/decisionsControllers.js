const models = require("../models");

const browse = (req, res) => {
  const status = req.query.status ? req.query.status : "0";
  const duree = req.query.duree ? req.query.duree : "0";
  const userId = req.query.id ? req.query.id : "0";
  const userConcerned = req.query.idConcerned ? req.query.idConcerned : "0";
  const userComment = req.query.idUserComment ? req.query.idUserComment : "0";
  models.decisions
    .readfilter(status, duree, userId, userConcerned, userComment)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.decisions
    .finddec(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const decisions = req.body;
  // TODO validations (length, format...)
  decisions.id = parseInt(req.params.id, 10);
  // console.log(decisions);
  models.decisions
    .update(decisions)
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

const statusedit = (req, res) => {
  const { id } = req.params;
  const { status } = req.params;
  models.decisions
    .updatestatus(id, status)
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
  const decisions = req.body;
  models.decisions
    .insert(decisions)
    .then(([result]) => {
      try {
        return result.insertId;
      } catch (error) {
        throw new Error(error);
      }
    })
    .then((iddecisionsinserted) => {
      try {
        if (decisions.users_impact.length) {
          models.decisions.insertuserimpact(
            iddecisionsinserted,
            decisions.users_impact
          );
        }
        return iddecisionsinserted;
      } catch (error) {
        throw new Error(error);
      }
    })
    .then((iddecisionsinserted) => {
      try {
        if (decisions.users_expert.length) {
          models.decisions.insertuserexpert(
            iddecisionsinserted,
            decisions.users_expert
          );
        }
        return res.sendStatus(201);
      } catch (error) {
        throw new Error(error);
      }
    })
    .catch((err) => {
      console.error(err);
      res
        .json(
          `Error when add decision with impacteds and experts users: ${err}`
        )
        .sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.decisions
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
  read,
  edit,
  statusedit,
  add,
  destroy,
};
