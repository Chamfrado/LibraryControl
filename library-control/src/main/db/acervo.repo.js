const { getDatabase } = require('./connection');

function listarAcervo() {
  const db = getDatabase();

  const stmt = db.prepare(`
    SELECT
      id,
      titulo,
      autor,
      editora,
      isbn,
      quantidade
    FROM cad_acervo
    ORDER BY titulo
  `);

  return stmt.all();
}

module.exports = { listarAcervo };