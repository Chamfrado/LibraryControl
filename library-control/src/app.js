const statusEl = document.getElementById('status');

async function carregar() {
  try {
    statusEl.textContent = 'Consultando banco...';

    if (!window.api) {
      throw new Error('window.api não está disponível');
    }

    if (!window.api.listarAcervo) {
      throw new Error('window.api.listarAcervo não está disponível');
    }

    const livros = await window.api.listarAcervo();

    statusEl.innerHTML = `
      <h2>Total de livros: ${livros.length}</h2>
      <ul>
        ${livros.map(l => `<li>${l.titulo} - ${l.autor}</li>`).join('')}
      </ul>
    `;
  } catch (error) {
    console.error(error);
    statusEl.innerHTML = `
      <h2>Erro ao carregar acervo</h2>
      <pre>${error.message}</pre>
    `;
  }
}

carregar();