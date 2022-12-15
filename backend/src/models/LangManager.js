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
}

module.exports = LangManager;
