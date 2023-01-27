const AbstractManager = require("./AbstractManager");

class GroupManager extends AbstractManager {
  constructor() {
    super({ table: "groups" });
  }

  findgroup(id) {
    return this.connection.query(
      `SELECT * FROM ${this.table} INNER JOIN group_user ON group_user.id_group = ? WHERE ${this.table}.id = ?`,
      [id, id]
    );
  }

  insert(body) {
    return this.connection.query(`INSERT INTO ${this.table}(name) VALUES(?);`, [
      body.name,
    ]);
  }

  update(groups) {
    return this.connection.query(
      `update ${this.table} set name = ? where id = ?`,
      [groups.name, groups.id]
    );
  }

  deleteinsertusergroup(groupid, users) {
    let values = "";
    users.forEach((el) => {
      values += `, (${el.id}, ${groupid})`;
    });
    values = values.substring(1);
    this.connection.query(
      `DELETE FROM group_user WHERE EXISTS(SELECT id_group WHERE id_group = ${groupid});`
    );
    return this.connection.query(
      `INSERT INTO group_user (id_user, id_group) VALUES ${values};`
    );
  }

  delete(id) {
    return this.connection.query(`delete from ${this.table} where id = ?`, [
      id,
    ]);
  }

  setConnection(connection) {
    this.connection = connection;
  }
}

module.exports = GroupManager;
