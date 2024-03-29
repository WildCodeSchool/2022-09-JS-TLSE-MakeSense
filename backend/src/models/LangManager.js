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

  allLangList() {
    return this.connection.query(`SELECT * FROM languages`);
  }

  insert(body) {
    return this.connection.query(
      `INSERT INTO ${this.table}(id_language, json) VALUES ((SELECT id FROM languages WHERE name = ?), ?)`,
      [body.lang, body.json]
    );
  }
}

module.exports = LangManager;
