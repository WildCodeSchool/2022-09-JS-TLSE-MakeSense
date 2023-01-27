const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  findusergroups(idgroup) {
    return this.connection.query(
      `SELECT ${this.table}.id, ${this.table}.firstname, ${this.table}.lastname FROM ${this.table} INNER JOIN group_user ON group_user.id_user = ${this.table}.id WHERE group_user.id_group = ?;`,
      [idgroup]
    );
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

  delete(id) {
    return this.connection.query(`delete from ${this.table} where id = ?`, [
      id,
    ]);
  }
}

module.exports = UsersManager;
