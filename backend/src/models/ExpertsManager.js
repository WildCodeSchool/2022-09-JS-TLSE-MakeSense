const AbstractManager = require("./AbstractManager");

class ExpertsManager extends AbstractManager {
  constructor() {
    super({ table: "decisions_experts" });
  }

  insert(expert) {
    return this.connection.query(
      `INSERT INTO ${this.table} VALUES((SELECT id FROM decisions ORDER BY id DESC LIMIT 1), ?);`,
      [expert.id_user_expert]
    );
  }

  find(id) {
    return this.connection.query(
      `SELECT ${this.table}.id_user_experts, users.id, users.lastname, users.firstname FROM ${this.table} INNER JOIN users ON ${this.table}.id_user_experts = users.id WHERE ${this.table}.id_decision = ?;`,
      [id]
    );
  }
}

module.exports = ExpertsManager;
