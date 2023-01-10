const AbstractManager = require("./AbstractManager");

class CommentsManager extends AbstractManager {
  constructor() {
    super({ table: "comments" });
  }

  findAll() {
    return this.connection.query(`select * from  ${this.table}`);
  }

  findAllWithLimit() {
    return this.connection.query(`select * from  ${this.table} LIMIT 5;`);
  }

  insert(comments) {
    return this.connection.query(
      `insert into ${this.table}(text, id_user_writer, id_decision) values (?, ?, ?);`,
      [comments.text, comments.id_user_writer, comments.id_decision]
    );
  }

  read(comments) {
    return this.connection.query(`select * from ${this.table} where id = ?`, [
      comments.id,
    ]);
  }

  updateContent(comments) {
    return this.connection.query(
      `update ${this.table} set text = ? where id = ?`,
      [comments.text, comments.id]
    );
  }
}

module.exports = CommentsManager;
