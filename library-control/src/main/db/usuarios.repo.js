const { getDatabase } = require("./connection");

function listarUsuarios() {
  const db = getDatabase();

  const stmt = db.prepare(`
    SELECT *
    FROM cad_usuario
    ORDER BY nome
  `);

  return stmt.all();
}

function buscarUsuarios(termo) {
  const db = getDatabase();

  const stmt = db.prepare(`
    SELECT *
    FROM cad_usuario
    WHERE nome LIKE ?
    ORDER BY nome
  `);

  return stmt.all(`%${termo}%`);
}

function contarUsuarios() {
  const db = getDatabase();

  const stmt = db.prepare(`
    SELECT COUNT(*) AS total
    FROM cad_usuario
  `);

  return stmt.get();
}

module.exports = { listarUsuarios, buscarUsuarios, contarUsuarios };
