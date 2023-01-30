const AbstractManager = require("./AbstractManager");

class DecisionsManager extends AbstractManager {
  constructor() {
    super({ table: "decisions" });
  }

  finddec(id) {
    return this.connection.query(
      `SELECT ${this.table}.id, ${this.table}.content, ${this.table}.status, ${this.table}.id_user_creator, ${this.table}.date_created, ${this.table}.date_update, users.lastname, users.firstname FROM ${this.table} INNER JOIN users ON ${this.table}.id_user_creator = users.id where ${this.table}.id = ?`,
      [id]
    );
  }

  insert(decisions) {
    return this.connection.query(
      `insert into ${this.table}(content, status, id_user_creator) values (?, ?, ?);`,
      [decisions.content, decisions.status, decisions.id_user_creator]
    );
  }

  insertuserimpact(iddecisionsinserted, usersimpact) {
    let values = "";
    usersimpact?.forEach((el) => {
      values += `, (${iddecisionsinserted}, ${el.id})`;
    });
    values = values.substring(1);
    return this.connection.query(
      `INSERT INTO decisions_impacts VALUES ${values};`
    );
  }

  insertuserexpert(iddecisionsinserted, usersexpert) {
    let values = "";
    usersexpert?.forEach((el) => {
      values += `, (${iddecisionsinserted},${el.id})`;
    });
    values = values.substring(1);
    return this.connection.query(
      `INSERT INTO decisions_experts VALUES ${values};`
    );
  }

  insertGroupImpact(iddecisionsinserted, groupsImpact) {
    let values = "";
    groupsImpact?.forEach((el) => {
      values += `, (${iddecisionsinserted}, ${el.id})`;
    });
    values = values.substring(1);
    return this.connection.query(
      `INSERT INTO decisions_g_impacts VALUES ${values};`
    );
  }

  insertGroupExpert(iddecisionsinserted, groupsExperts) {
    let values = "";
    groupsExperts?.forEach((el) => {
      values += `, (${iddecisionsinserted},${el.id})`;
    });
    values = values.substring(1);
    return this.connection.query(
      `INSERT INTO decisions_g_experts VALUES ${values};`
    );
  }

  read(decisions) {
    return this.connection.query(`select * from ${this.table} where id = ?`, [
      decisions.id,
    ]);
  }

  readfilter(
    status,
    duree,
    userId,
    userImpacted,
    userExpert,
    groupImpacted,
    groupExpert,
    userComment
  ) {
    let andUser = "";
    let durees = "";
    let operator = "=";
    if (status === "0") {
      operator = ">=";
      // eslint-disable-next-line no-unused-expressions, no-param-reassign
      status = "1";
    }
    if (duree !== "0") {
      durees = `AND DATE(date_created) >= CURDATE() - INTERVAL ${duree} DAY`;
    }
    if (userId !== "0") {
      andUser = `AND ${this.table}.id_user_creator = ${userId}`;
    }
    let queryContent = `SELECT ${this.table}.id, ${this.table}.content, ${this.table}.status, ${this.table}.id_user_creator, ${this.table}.date_created, ${this.table}.date_update, users.firstname, users.lastname FROM ${this.table} INNER JOIN users WHERE ${this.table}.id_user_creator = users.id AND status ${operator} ? ${durees} ${andUser} ;`;
    if (userImpacted !== "0") {
      queryContent = `SELECT * FROM ${this.table} WHERE id IN (SELECT decisions_impacts.id_decisions FROM decisions_impacts WHERE decisions_impacts.id_user_impact = ${userImpacted} GROUP BY id_decisions) AND status ${operator} ? ${durees};`;
    }
    if (userExpert !== "0") {
      queryContent = `SELECT * FROM ${this.table} WHERE id IN (SELECT decisions_impacts.id_decisions FROM decisions_impacts WHERE decisions_impacts.id_user_impact = ${userExpert} GROUP BY id_decisions) AND status ${operator} ? ${durees};`;
    }
    if (groupImpacted !== "0") {
      queryContent = `SELECT ${this.table}.id, ${this.table}.content, ${this.table}.status, groups.name FROM ${this.table} INNER JOIN decisions_g_impacts ON ${this.table}.id = decisions_g_impacts.id_decisions INNER JOIN groups ON groups.id = decisions_g_impacts.id_g_impact INNER JOIN group_user ON group_user.id_groups = groups.id INNER JOIN users ON users.id = group_user.id_user WHERE users.id = ${groupImpacted} AND status ${operator} ? ${durees};`;
    }
    if (groupExpert !== "0") {
      queryContent = `SELECT ${this.table}.id, ${this.table}.content, ${this.table}.status, groups.name FROM ${this.table} INNER JOIN decisions_g_experts ON ${this.table}.id = decisions_g_experts.id_decisions INNER JOIN groups ON groups.id = decisions_g_experts.id_g_expert INNER JOIN group_user ON group_user.id_groups = groups.id INNER JOIN users ON users.id = group_user.id_user WHERE users.id = ${groupImpacted} AND status ${operator} ? ${durees};`;
    }
    if (userComment !== "0") {
      queryContent = `SELECT * FROM ${this.table} WHERE ${this.table}.id IN (SELECT comments.id_decision FROM comments WHERE id_user_writer=${userComment} GROUP BY id_decision) AND status ${operator} ? ${durees};`;
    }

    return this.connection.query(queryContent, [status]);
  }

  update(decision) {
    return this.connection.query(
      `update ${this.table} set content = ?, date_update = NOW() where id = ?`,
      [decision.content, decision.id]
    );
  }

  updatestatus(id, status) {
    return this.connection.query(
      `update ${this.table} set status = ? where id = ?`,
      [status, id]
    );
  }
}

module.exports = DecisionsManager;
