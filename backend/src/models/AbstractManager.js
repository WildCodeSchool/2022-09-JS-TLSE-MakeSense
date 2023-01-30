class AbstractManager {
  constructor({ table }) {
    this.table = table;
  }

  find(id) {
    return this.connection.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
  }

  findAll() {
    return this.connection.query(`select * from  ${this.table}`);
  }

  updateliaison(decisionid, usersgroups, tableliaison, secondcolumn) {
    let values = "";
    usersgroups.forEach((el) => {
      values += `, (${decisionid},${el.id})`;
    });
    values = values.substring(1);
    this.connection.query(
      `DELETE FROM ${tableliaison} WHERE EXISTS(SELECT id_${this.table} WHERE id_${this.table} = ${decisionid});`
    );
    return this.connection.query(
      `INSERT INTO ${tableliaison} (id_${this.table}, ${secondcolumn}) VALUES ${values};`
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

module.exports = AbstractManager;
