const AbstractManager = require("./AbstractManager");

class LangManager extends AbstractManager {
  constructor() {
    super({ table: "lang_active" });
  }

  findLangList() {
    return this.connection.query(
      `SELECT l.iso_639_1, l.name,json FROM ${this.table} INNER JOIN languages as l WHERE id_language = l.id`
    );
  }

  // insert(item) {
  //   return this.connection.query(
  //     `insert into ${this.table} (title) values (?)`,
  //     [item.title]
  //   );
  // }

  // update(item) {
  //   return this.connection.query(
  //     `update ${this.table} set title = ? where id = ?`,
  //     [item.title, item.id]
  //   );
  // }
}

module.exports = LangManager;
