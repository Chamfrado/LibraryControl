const { getDatabase } = require("./connection");

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
function buscarAcervo(termo) {
  const db = getDatabase();

  const stmt = db.prepare(`
    SELECT id, titulo, autor, editora, isbn, quantidade
    FROM cad_acervo
    WHERE titulo LIKE ? OR autor LIKE ?
    ORDER BY titulo
  `);

  return stmt.all(`%${termo}%`, `%${termo}%`);
}

function contarAcervo() {
  const db = getDatabase();

  const stmt = db.prepare(`
    SELECT COUNT(*) AS total
    FROM cad_acervo
  `);

  return stmt.get();
}

module.exports = { listarAcervo, buscarAcervo, contarAcervo };
