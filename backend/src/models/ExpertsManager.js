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
    return this.connection.query(`select * from ${this.table} where id = ?`, [
      id,
    ]);
  }
}

module.exports = ExpertsManager;
