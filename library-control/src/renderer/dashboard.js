document.getElementById("app").innerHTML = getLayout(
  "dashboard",
  `
    <div class="page-header">
      <div>
        <h1>Dashboard</h1>
        <p>Visão geral do sistema bibliotecário</p>
      </div>
    </div>

    <section class="stats-grid">
      <div class="stat-card">
        <span>Total de livros</span>
        <strong id="cardTotalLivros">0</strong>
        <small>Itens cadastrados no acervo</small>
      </div>

      <div class="stat-card">
        <span>Total de usuários</span>
        <strong id="cardTotalUsuarios">0</strong>
        <small>Usuários cadastrados</small>
      </div>

      <div class="stat-card">
        <span>Empréstimos ativos</span>
        <strong id="cardEmprestimosAtivos">0</strong>
        <small>Atualmente emprestados</small>
      </div>

      <div class="stat-card danger">
        <span>Empréstimos atrasados</span>
        <strong id="cardEmprestimosAtrasados">0</strong>
        <small>Precisam de atenção</small>
      </div>
    </section>

    <section class="dashboard-grid">
      <div class="panel">
        <div class="panel-header">
          <div>
            <h2>Empréstimos atrasados</h2>
            <p>Itens que passaram da data prevista de devolução</p>
          </div>
          <button id="btnAtualizarDashboard" class="btn-primary">Atualizar</button>
        </div>

        <div id="resultadoAtrasados"></div>
      </div>

      <div class="panel">
        <div class="panel-header">
          <div>
            <h2>Ações rápidas</h2>
            <p>Acesse as principais rotinas do sistema</p>
          </div>
        </div>

        <div class="quick-actions">
          <a href="./emprestimos.html" class="quick-card">Novo empréstimo</a>
          <a href="./acervo.html" class="quick-card">Cadastrar livro</a>
          <a href="./usuarios.html" class="quick-card">Novo usuário</a>
          <a href="./configuracoes.html" class="quick-card">Importar CSV</a>
        </div>
      </div>
    </section>
  `,
);

const cardTotalLivros = document.getElementById("cardTotalLivros");
const cardTotalUsuarios = document.getElementById("cardTotalUsuarios");
const cardEmprestimosAtivos = document.getElementById("cardEmprestimosAtivos");
const cardEmprestimosAtrasados = document.getElementById(
  "cardEmprestimosAtrasados",
);
const resultadoAtrasados = document.getElementById("resultadoAtrasados");
const btnAtualizarDashboard = document.getElementById("btnAtualizarDashboard");

function formatarDataPtBr(data) {
  if (!data) return "-";

  const [ano, mes, dia] = String(data).split("-");
  if (!ano || !mes || !dia) return data;

  return `${dia}/${mes}/${ano}`;
}

function calcularDiasAtraso(dataDevolucao) {
  if (!dataDevolucao) return 0;

  const hoje = new Date();
  const hojeLocal = new Date(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate(),
  );

  const [ano, mes, dia] = String(dataDevolucao).split("-").map(Number);
  const devolucao = new Date(ano, mes - 1, dia);

  const diff = hojeLocal - devolucao;
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

async function carregarDashboard() {
  const [totalLivros, totalUsuarios, totalAtivos, totalAtrasados, atrasados] =
    await Promise.all([
      window.api.contarAcervo(),
      window.api.contarUsuarios(),
      window.api.contarEmprestimosAtivos(),
      window.api.contarEmprestimosAtrasados(),
      window.api.listarEmprestimosAtrasados(),
    ]);

  cardTotalLivros.textContent = totalLivros?.total ?? 0;
  cardTotalUsuarios.textContent = totalUsuarios?.total ?? 0;
  cardEmprestimosAtivos.textContent = totalAtivos?.total ?? 0;
  cardEmprestimosAtrasados.textContent = totalAtrasados?.total ?? 0;

  renderAtrasados(atrasados ?? []);
}

function renderAtrasados(lista) {
  if (!lista.length) {
    resultadoAtrasados.innerHTML = `
      <div class="empty-state">
        Nenhum empréstimo atrasado no momento.
      </div>
    `;
    return;
  }

  resultadoAtrasados.innerHTML = `
    <div class="table-wrapper">
      <table class="modern-table">
        <thead>
          <tr>
            <th>Usuário</th>
            <th>Livro</th>
            <th>Empréstimo</th>
            <th>Devolução</th>
            <th>Atraso</th>
          </tr>
        </thead>
        <tbody>
          ${lista
            .map((item) => {
              const dias = calcularDiasAtraso(item.data_devolucao);

              return `
                <tr>
                  <td>${item.usuario ?? ""}</td>
                  <td>${item.livro ?? ""}</td>
                  <td>${formatarDataPtBr(item.data_atual)}</td>
                  <td>${formatarDataPtBr(item.data_devolucao)}</td>
                  <td>
                    <span class="badge-status badge-atrasado">
                      ${dias} dia${dias === 1 ? "" : "s"}
                    </span>
                  </td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

btnAtualizarDashboard.addEventListener("click", async () => {
  try {
    await carregarDashboard();
  } catch (error) {
    await alertModal({
      title: "Erro",
      message: error.message,
    });
  }
});

(async function init() {
  try {
    await carregarDashboard();
  } catch (error) {
    await alertModal({
      title: "Erro ao carregar dashboard",
      message: error.message,
    });
  }
})();
