const AbstractManager = require("./AbstractManager");

class DecisionsManager extends AbstractManager {
  constructor() {
    super({ table: "decisions" });
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

  updateContent(decisions) {
    return this.connection.query(
      `update ${this.table} set content = ? where id = ?`,
      [decisions.content, decisions.id]
    );
  }
}

module.exports = DecisionsManager;
