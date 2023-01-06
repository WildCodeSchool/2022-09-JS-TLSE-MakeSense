const AbstractManager = require("./AbstractManager");

class DecisionsManager extends AbstractManager {
  constructor() {
    super({ table: "decisions" });
  }

  insert(decisions) {
    return this.connection.query(
      `insert into ${this.table}(lastname, firstname, email, password, serviceId, admin) values (?, ?, ?, ?, ?, ?);`,
      [
        decisions.lastname,
        decisions.firstname,
        decisions.email,
        decisions.hashedPassword,
        decisions.serviceId,
        decisions.admin,
      ]
    );
  }

  read(decisions) {
    return this.connection.query(`select * from ${this.table} where id = ?`, [
      decisions.id,
    ]);
  }

  readForLogin(decisions) {
    return this.connection.query(
      `select * from ${this.table} where email = ?;`,
      [decisions.email]
    );
  }

  update(decisions) {
    return this.connection.query(
      `update ${this.table} set title = ? where id = ?`,
      [decisions.title, decisions.id]
    );
  }
}

module.exports = DecisionsManager;
