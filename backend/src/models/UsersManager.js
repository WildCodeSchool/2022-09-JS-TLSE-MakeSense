const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  insert(users) {
    return this.connection.query(
      `insert into ${this.table} (title) values (?)`,
      [users.title]
    );
  }

  update(users) {
    return this.connection.query(
      `update ${this.table} set title = ? where id = ?`,
      [users.title, users.id]
    );
  }
}

module.exports = ItemManager;
