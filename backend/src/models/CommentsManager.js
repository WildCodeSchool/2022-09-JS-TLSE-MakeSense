const AbstractManager = require("./AbstractManager");

class CommentsManager extends AbstractManager {
  constructor() {
    super({ table: "comments" });
  }

  findcomment(id) {
    return this.connection.query(
      `select ${this.table}.id, ${this.table}.text, ${this.table}.date_creation, ${this.table}.id_user_writer, ${this.table}.id_decision, users.lastname, users.firstname FROM ${this.table} INNER JOIN users ON ${this.table}.id_user_writer = users.id WHERE id_decision = ?`,
      [id]
    );
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
