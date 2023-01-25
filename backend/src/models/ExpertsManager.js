const AbstractManager = require("./AbstractManager");

class ExpertsManager extends AbstractManager {
  constructor() {
    super({ table: "decisions_experts" });
  }

  findexpert(id) {
    return this.connection.query(
      `SELECT ${this.table}.id_user_expert, users.id, users.lastname, users.firstname FROM ${this.table} INNER JOIN users ON ${this.table}.id_user_expert = users.id WHERE ${this.table}.id_decision = ? LIMIT 5;`,
      [id]
    );
  }
}

module.exports = ExpertsManager;
