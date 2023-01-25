const AbstractManager = require("./AbstractManager");

class ExpertsManager extends AbstractManager {
  constructor() {
    super({ table: "decisions_impacts" });
  }

  find(id) {
    return this.connection.query(
      `SELECT ${this.table}.id_user_impact, users.id, users.lastname, users.firstname FROM ${this.table} INNER JOIN users ON ${this.table}.id_user_impact = users.id WHERE ${this.table}.id_decision = ? LIMIT 5;`,
      [id]
    );
  }
}

module.exports = ExpertsManager;
