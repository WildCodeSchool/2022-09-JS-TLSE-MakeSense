const models = require("../models");

const browse = (req, res) => {
  const status = req.query.status ? req.query.status : "0";
  const duree = req.query.duree ? req.query.duree : "0";
  const userId = req.query.id ? req.query.id : "0";
  const userImpacted = req.query.idImpacted ? req.query.idImpacted : "0";
  const userExpert = req.query.idExpert ? req.query.idExpert : "0";
  const groupImpacted = req.query.idUserInGroupImpacted
    ? req.query.idUserInGroupImpacted
    : "0";
  const groupExpert = req.query.idUserInGroupExpert
    ? req.query.idUserInGroupExpert
    : "0";
  const userComment = req.query.idUserComment ? req.query.idUserComment : "0";
  models.decisions
    .readfilter(
      status,
      duree,
      userId,
      userImpacted,
      userExpert,
      groupImpacted,
      groupExpert,
      userComment
    )
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  let decision;
  let uimpacted;
  let uexpert;
  let gimpacted;
  let gexpert;
  const promise1 = models.decisions.finddec(req.params.id).then(([rows]) => {
    [decision] = rows;
  });
  const promise2 = models.users
    .findUsersImpactedWithDecisionId(req.params.id)
    .then(([usersimpacted]) => {
      uimpacted = usersimpacted;
    });
  const promise3 = models.users
    .findUsersExpertsWithDecisionId(req.params.id)
    .then(([usersexpert]) => {
      uexpert = usersexpert;
    });
  const promise4 = models.groups
    .findGroupsImpactedWithDecisionId(req.params.id)
    .then(([groupsimpacted]) => {
      gimpacted = groupsimpacted;
    });
  const promise5 = models.groups
    .findGroupsExpertsWithDecisionId(req.params.id)
    .then(([groupsexpert]) => {
      gexpert = groupsexpert;
    });
  Promise.all([promise1, promise2, promise3, promise4, promise5])
    .then(() => {
      res
        .status(200)
        .json({ decision, uimpacted, uexpert, gimpacted, gexpert });
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
  const promise1 = models.decisions.update(decisions);
  const promise2 = models.decisions
    .updateliaison(
      decisions.id,
      decisions.users_impact,
      "decisions_impacts",
      "id_user_impact"
    )
    .then(() => {
      console.warn("Liaison decisions_impacts update");
    });
  const promise3 = models.decisions
    .updateliaison(
      decisions.id,
      decisions.users_expert,
      "decisions_experts",
      "id_user_expert"
    )
    .then(() => {
      console.warn("Liaison decisions_experts update");
    });
  const promise4 = models.decisions
    .updateliaison(
      decisions.id,
      decisions.groups_impact,
      "decisions_g_impacts",
      "id_g_impact"
    )
    .then(() => {
      console.warn("Liaison decisions_g_impacts update");
    });
  const promise5 = models.decisions
    .updateliaison(
      decisions.id,
      decisions.groups_expert,
      "decisions_g_impacts",
      "id_g_impact"
    )
    .then(() => {
      console.warn("Liaison decisions_g_impacts update");
    });
  Promise.all([promise1, promise2, promise3, promise4, promise5])
    .then(() => {
      res.sendStatus(204);
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
        return iddecisionsinserted;
      } catch (error) {
        throw new Error(error);
      }
    })
    .then((iddecisionsinserted) => {
      try {
        if (decisions.groups_impact.length) {
          models.decisions.insertGroupImpact(
            iddecisionsinserted,
            decisions.groups_impact
          );
        }
        return iddecisionsinserted;
      } catch (error) {
        throw new Error(error);
      }
    })
    .then((iddecisionsinserted) => {
      try {
        if (decisions.groups_expert.length) {
          models.decisions.insertGroupExpert(
            iddecisionsinserted,
            decisions.groups_expert
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
