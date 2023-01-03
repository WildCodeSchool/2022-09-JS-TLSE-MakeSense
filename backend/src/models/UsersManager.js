const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  insert(users) {
    return this.connection.query(
      `insert into ${this.table}(lastname, firstname, email, password, serviceId, admin) values (?, ?, ?, ?, ?, ?);`,
      [
        users.lastname,
        users.firstname,
        users.email,
        users.hashedPassword,
        users.serviceId,
        users.admin,
      ]
    );
  }

  read(users) {
    return this.connection.query(`select * from ${this.table} where id = ?`, [
      users.id,
    ]);
  }

  readForLogin(users) {
    return this.connection.query(
      `select * from ${this.table} where email = ?;`,
      [users.email]
    );
  }

  update(users) {
    return this.connection.query(
      `update ${this.table} set title = ? where id = ?`,
      [users.title, users.id]
    );
  }
}

module.exports = UsersManager;
