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

  find(id) {
    return this.connection.query(`select * from ${this.table} where id = ?`, [
      id,
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
      `update ${this.table} set firstname = ?, lastname = ? , email = ?, password = ? where id = ?`,
      [
        users.firstname,
        users.lastname,
        users.email,
        users.hashedPassword,
        users.id,
      ]
    );
  }
}

module.exports = UsersManager;
