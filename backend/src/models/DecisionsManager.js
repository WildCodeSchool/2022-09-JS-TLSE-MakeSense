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

  updateContent(decisions) {
    return this.connection.query(
      `update ${this.table} set content = ? where id = ?`,
      [decisions.content, decisions.id]
    );
  }
}

module.exports = DecisionsManager;
