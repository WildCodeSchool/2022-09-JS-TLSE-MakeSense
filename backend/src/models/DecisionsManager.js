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

  readfilter(status, duree) {
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
    return this.connection.query(
      `SELECT ${this.table}.id, ${this.table}.content, ${this.table}.status, ${this.table}.id_user_creator, ${this.table}.date_created, ${this.table}.date_update, users.firstname, users.lastname FROM ${this.table} INNER JOIN users WHERE ${this.table}.id_user_creator = users.id AND status ${operator} ? ${durees};`,
      [status]
    );
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
