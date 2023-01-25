const AbstractManager = require("./AbstractManager");

class ExpertsManager extends AbstractManager {
  constructor() {
    super({ table: "decisions_impacts" });
  }

  insert(imp) {
    return this.connection.query(
      `INSERT IGNORE INTO ${this.table} VALUES((SELECT id FROM decisions ORDER BY id DESC LIMIT 1), ?);`,
      [imp.id_user_impact]
    );
  }

  find(id) {
    return this.connection.query(
      `SELECT ${this.table}.id_user_impact, users.id, users.lastname, users.firstname FROM ${this.table} INNER JOIN users ON ${this.table}.id_user_impact = users.id WHERE ${this.table}.id_decision = ? LIMIT 5;`,
      [id]
    );
  }
}

module.exports = ExpertsManager;
