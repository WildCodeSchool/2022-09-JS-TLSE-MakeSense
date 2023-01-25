const AbstractManager = require("./AbstractManager");

class DecisionsManager extends AbstractManager {
  constructor() {
    super({ table: "decisions" });
  }

  find(id) {
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

  read(decisions) {
    return this.connection.query(`select * from ${this.table} where id = ?`, [
      decisions.id,
    ]);
  }

  readfilter(status, duree, userId, userConcerned, userComment) {
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
    if (userConcerned !== "0") {
      queryContent = `SELECT * FROM ${this.table} WHERE id IN (SELECT decisions_impacts.id_decision FROM decisions_impacts WHERE decisions_impacts.id_user_impact = ${userConcerned} UNION SELECT decisions_experts.id_decision FROM decisions_experts WHERE decisions_experts.id_user_expert = ${userConcerned} GROUP BY id_decision) AND status ${operator} ? ${durees};`;
    }
    if (userComment !== "0") {
      queryContent = `SELECT * FROM ${this.table} WHERE ${this.table}.id IN (SELECT comments.id_decision FROM comments WHERE id_user_writer=${userComment} GROUP BY id_decision) AND status ${operator} ? ${durees};`;
    }

    return this.connection.query(queryContent, [status]);
  }

  updatestatus(id, status) {
    return this.connection.query(
      `update ${this.table} set status = ? where id = ?`,
      [status, id]
    );
  }

  updateContent(decisions) {
    return this.connection.query(
      `update ${this.table} set content = ? where id = ?`,
      [decisions.content, decisions.id]
    );
  }

  delete(id) {
    return this.connection.query(`delete from ${this.table} where id = ?`, [
      id,
    ]);
  }
}

module.exports = DecisionsManager;
