const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  findusergroups(idgroup) {
    return this.connection.query(
      `SELECT ${this.table}.id, ${this.table}.firstname, ${this.table}.lastname FROM ${this.table} INNER JOIN group_user ON group_user.id_user = ${this.table}.id WHERE group_user.id_groups = ?;`,
      [idgroup]
    );
  }

  findUsersImpactedWithDecisionId(id) {
    return this.connection.query(
      `SELECT decisions_impacts.id_user_impact, ${this.table}.id, ${this.table}.lastname, ${this.table}.firstname, ${this.table}.avatar_url FROM ${this.table} INNER JOIN decisions_impacts ON decisions_impacts.id_user_impact = ${this.table}.id WHERE decisions_impacts.id_decisions = ? LIMIT 5;`,
      [id]
    );
  }

  findUsersExpertsWithDecisionId(id) {
    return this.connection.query(
      `SELECT decisions_experts.id_user_expert, ${this.table}.id, ${this.table}.lastname, ${this.table}.firstname, ${this.table}.avatar_url FROM ${this.table} INNER JOIN decisions_experts ON decisions_experts.id_user_expert = ${this.table}.id WHERE decisions_experts.id_decisions = ? LIMIT 5;`,
      [id]
    );
  }

  insert(users) {
    const avatar = "http://localhost:3000/src/assets/img/profile.png";
    return this.connection.query(
      `insert into ${this.table}(lastname, firstname, email, password, serviceId, admin, avatar_url) values (?, ?, ?, ?, ?, ?, ?);`,
      [
        users.lastname,
        users.firstname,
        users.email,
        users.hashedPassword,
        users.serviceId,
        users.admin,
        avatar,
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

  updateAvatar(users) {
    return this.connection.query(
      `update ${this.table} set avatar_url = ? where id = ?`,
      [users.avatar_url, users.id]
    );
  }

  delete(id) {
    return this.connection.query(`delete from ${this.table} where id = ?`, [
      id,
    ]);
  }
}

module.exports = UsersManager;
