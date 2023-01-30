const AbstractManager = require("./AbstractManager");

class GroupManager extends AbstractManager {
  constructor() {
    super({ table: "groups" });
  }

  findgroup(id) {
    return this.connection.query(
      `SELECT * FROM ${this.table} INNER JOIN group_user ON group_user.id_groups = ? WHERE ${this.table}.id = ?`,
      [id, id]
    );
  }

  findGroupsImpactedWithDecisionId(id) {
    return this.connection.query(
      `SELECT ${this.table}.name, ${this.table}.id FROM ${this.table} INNER JOIN decisions_g_impacts ON decisions_g_impacts.id_g_impact = ${this.table}.id AND decisions_g_impacts.id_decisions = ? LIMIT 5;`,
      [id]
    );
  }

  findGroupsExpertsWithDecisionId(id) {
    return this.connection.query(
      `SELECT ${this.table}.name, ${this.table}.id FROM ${this.table} INNER JOIN decisions_g_experts ON decisions_g_experts.id_g_expert = ${this.table}.id AND decisions_g_experts.id_decisions = ? LIMIT 5;`,
      [id]
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
