const AbstractManager = require("./AbstractManager");

class ExpertsManager extends AbstractManager {
  constructor() {
    super({ table: "decisions_experts" });
  }

  check(expert) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE id_user_expert = ? AND id_decision = (SELECT id FROM decisions ORDER BY id DESC LIMIT 1);`,
      [expert.id_user_expert]
    );
  }

  insert(expert) {
    return this.connection.query(
      `INSERT IGNORE INTO ${this.table} VALUES((SELECT id FROM decisions ORDER BY id DESC LIMIT 1), ?);`,
      [expert.id_user_expert]
    );
  }

  find(id) {
    return this.connection.query(
      `SELECT ${this.table}.id_user_expert, users.id, users.lastname, users.firstname FROM ${this.table} INNER JOIN users ON ${this.table}.id_user_expert = users.id WHERE ${this.table}.id_decision = ? LIMIT 5;`,
      [id]
    );
  }
}

module.exports = ExpertsManager;
