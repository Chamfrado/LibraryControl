document.getElementById("app").innerHTML = getLayout(
  "emprestimos",
  `
    <h2>Criar empréstimo</h2>

    <div class="form-box">
      <label>Usuário</label>
      <div class="acoes-formulario">
        <button id="btnSelecionarUsuario" type="button">Pesquisar usuário</button>
        <span id="usuarioSelecionadoTexto">Nenhum usuário selecionado</span>
      </div>

      <label>Livro</label>
      <div class="acoes-formulario">
        <button id="btnSelecionarLivro" type="button">Pesquisar livro</button>
        <span id="livroSelecionadoTexto">Nenhum livro selecionado</span>
      </div>

      <label for="inputDias">Quantidade de dias</label>
      <input type="number" id="inputDias" min="1" value="7" />

      <button id="btnCriarEmprestimo">Criar empréstimo</button>
    </div>

    <div id="statusEmprestimo" class="status-box"></div>

    <hr />

    <h2>Empréstimos</h2>
    <div class="toolbar">
      <input
        id="buscaEmprestimo"
        placeholder="Buscar por usuário ou livro..."
      />

      <select id="filtroStatusEmprestimo">
        <option value="todos">Todos</option>
        <option value="ativos">Ativos</option>
        <option value="devolvidos">Devolvidos</option>
        <option value="atrasados">Atrasados</option>
      </select>

      <button id="btnBuscarEmprestimos">Buscar</button>
    </div>

    <div id="resultadoEmprestimos"></div>
  `,
);

const inputDias = document.getElementById("inputDias");
const btnCriarEmprestimo = document.getElementById("btnCriarEmprestimo");
const statusEmprestimo = document.getElementById("statusEmprestimo");
const resultadoEmprestimosEl = document.getElementById("resultadoEmprestimos");
const inputBuscaEmprestimo = document.getElementById("buscaEmprestimo");
const filtroStatusEmprestimo = document.getElementById(
  "filtroStatusEmprestimo",
);
const btnBuscarEmprestimos = document.getElementById("btnBuscarEmprestimos");

const btnSelecionarUsuario = document.getElementById("btnSelecionarUsuario");
const btnSelecionarLivro = document.getElementById("btnSelecionarLivro");
const usuarioSelecionadoTexto = document.getElementById(
  "usuarioSelecionadoTexto",
);
const livroSelecionadoTexto = document.getElementById("livroSelecionadoTexto");

let usuarioSelecionado = null;
let livroSelecionado = null;

function formatarDataPtBr(data) {
  if (!data) return "";

  const [ano, mes, dia] = String(data).split("-");
  if (!ano || !mes || !dia) return data;

  return `${dia}/${mes}/${ano}`;
}

function diferencaDias(dataAlvo) {
  if (!dataAlvo) return null;

  const hoje = new Date();
  const hojeLocal = new Date(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate(),
  );

  const [ano, mes, dia] = String(dataAlvo).split("-").map(Number);
  const alvoLocal = new Date(ano, mes - 1, dia);

  const diffMs = alvoLocal - hojeLocal;
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

function getInfoEmprestimo(e) {
  const jaDevolvido = normalizarTexto(e.devolvido).includes("sim");

  if (jaDevolvido) {
    return {
      status: "Devolvido",
      prazoTexto: "devolvido",
      classeLinha: "status-devolvido",
      classeBadge: "badge-devolvido",
      jaDevolvido: true,
    };
  }

  const dias = diferencaDias(e.data_devolucao);

  if (dias === null) {
    return {
      status: "Ativo",
      prazoTexto: "-",
      classeLinha: "status-ativo",
      classeBadge: "badge-ativo",
      jaDevolvido: false,
    };
  }

  if (dias < 0) {
    const atraso = Math.abs(dias);
    return {
      status: "Atrasado",
      prazoTexto: `${atraso} dia${atraso === 1 ? "" : "s"} de atraso`,
      classeLinha: "status-atrasado",
      classeBadge: "badge-atrasado",
      jaDevolvido: false,
    };
  }

  if (dias === 0) {
    return {
      status: "Vence hoje",
      prazoTexto: "vence hoje",
      classeLinha: "status-vencendo",
      classeBadge: "badge-vencendo",
      jaDevolvido: false,
    };
  }

  if (dias === 1) {
    return {
      status: "Vence amanhã",
      prazoTexto: "vence amanhã",
      classeLinha: "status-vencendo",
      classeBadge: "badge-vencendo",
      jaDevolvido: false,
    };
  }

  return {
    status: "Ativo",
    prazoTexto: `${dias} dia${dias === 1 ? "" : "s"} restante${dias === 1 ? "" : "s"}`,
    classeLinha: "status-ativo",
    classeBadge: "badge-ativo",
    jaDevolvido: false,
  };
}

function renderEmprestimos(lista) {
  resultadoEmprestimosEl.innerHTML = `
    <h2>Empréstimos - Total: ${lista.length}</h2>
    <table>
      <tr>
        <th>Usuário</th>
        <th>Livro</th>
        <th>Data</th>
        <th>Devolução</th>
        <th>Status</th>
        <th>Prazo</th>
        <th>Ação</th>
      </tr>
      ${lista
        .map((e) => {
          const info = getInfoEmprestimo(e);

          return `
          <tr class="${info.classeLinha}">
            <td>${e.usuario ?? ""}</td>
            <td>${e.livro ?? ""}</td>
            <td>${formatarDataPtBr(e.data_atual)}</td>
            <td>${formatarDataPtBr(e.data_devolucao)}</td>
            <td>
              <span class="badge-status ${info.classeBadge}">
                ${info.status}
              </span>
            </td>
            <td>${info.prazoTexto}</td>
            <td>
              ${
                info.jaDevolvido
                  ? "-"
                  : `<button class="btn-devolver" data-id="${e.id}">Devolver</button>`
              }
            </td>
          </tr>
        `;
        })
        .join("")}
    </table>
  `;

  document.querySelectorAll(".btn-devolver").forEach((botao) => {
    botao.addEventListener("click", async () => {
      try {
        await window.api.devolverEmprestimo(botao.dataset.id);
        await carregarEmprestimos();
      } catch (error) {
        await alertModal({
          title: "Erro",
          message: error.message,
        });
      }
    });
  });
}

async function carregarEmprestimos() {
  const lista = await window.api.listarEmprestimos();
  renderEmprestimos(lista);
}

async function buscarEmprestimosTela() {
  const termo = inputBuscaEmprestimo.value.trim();
  const status = filtroStatusEmprestimo.value;

  const lista = await window.api.buscarEmprestimos({
    termo,
    status,
  });

  renderEmprestimos(lista);
}

async function selecionarUsuario() {
  const usuarios = await window.api.listarUsuarios();

  const escolhido = await escolherItemModal({
    title: "Selecionar usuário",
    placeholder: "Buscar por nome ou login...",
    items: usuarios,
    getLabel: (u) => `${u.nome ?? ""} (${u.login ?? "sem login"})`,
  });

  if (!escolhido) return;

  usuarioSelecionado = escolhido;
  usuarioSelecionadoTexto.textContent = `${escolhido.nome ?? ""} (${escolhido.login ?? ""})`;
}

async function selecionarLivro() {
  const livros = await window.api.listarAcervo();

  const disponiveis = livros.filter(
    (livro) => Number(livro.quantidade ?? 0) > 0,
  );

  const escolhido = await escolherItemModal({
    title: "Selecionar livro",
    placeholder: "Buscar por título ou autor...",
    items: disponiveis,
    getLabel: (l) =>
      `${l.titulo ?? ""} — ${l.autor ?? "Autor não informado"} (${l.quantidade ?? 0} disponível)`,
  });

  if (!escolhido) return;

  livroSelecionado = escolhido;
  livroSelecionadoTexto.textContent = `${escolhido.titulo ?? ""} (${escolhido.quantidade ?? 0} disponível)`;
}

btnSelecionarUsuario.addEventListener("click", async () => {
  try {
    await selecionarUsuario();
  } catch (error) {
    await alertModal({
      title: "Erro",
      message: error.message,
    });
  }
});

btnSelecionarLivro.addEventListener("click", async () => {
  try {
    await selecionarLivro();
  } catch (error) {
    await alertModal({
      title: "Erro",
      message: error.message,
    });
  }
});

btnCriarEmprestimo.addEventListener("click", async () => {
  try {
    const userId = usuarioSelecionado?.id;
    const acervoId = livroSelecionado?.id;
    const totalDias = inputDias.value;

    if (!userId) {
      await alertModal({
        title: "Validação",
        message: "Selecione um usuário.",
      });
      return;
    }

    if (!acervoId) {
      await alertModal({
        title: "Validação",
        message: "Selecione um livro.",
      });
      return;
    }

    if (!totalDias || Number(totalDias) < 1) {
      await alertModal({
        title: "Validação",
        message: "Informe uma quantidade de dias válida.",
      });
      return;
    }

    showLoadingModal("Criando empréstimo...");

    await window.api.criarEmprestimo({ userId, acervoId, totalDias });

    hideLoadingModal();

    usuarioSelecionado = null;
    livroSelecionado = null;
    usuarioSelecionadoTexto.textContent = "Nenhum usuário selecionado";
    livroSelecionadoTexto.textContent = "Nenhum livro selecionado";
    inputDias.value = 7;

    await carregarEmprestimos();

    await alertModal({
      title: "Sucesso",
      message: "Empréstimo criado com sucesso.",
    });
  } catch (error) {
    hideLoadingModal();
    await alertModal({
      title: "Erro",
      message: error.message,
    });
  }
});

btnBuscarEmprestimos.addEventListener("click", async () => {
  try {
    await buscarEmprestimosTela();
  } catch (error) {
    await alertModal({
      title: "Erro",
      message: error.message,
    });
  }
});

inputBuscaEmprestimo.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    btnBuscarEmprestimos.click();
  }
});

filtroStatusEmprestimo.addEventListener("change", async () => {
  try {
    await buscarEmprestimosTela();
  } catch (error) {
    await alertModal({
      title: "Erro",
      message: error.message,
    });
  }
});

(async function init() {
  try {
    setStatus("Carregando empréstimos...");
    await carregarEmprestimos();
    setStatus("");
  } catch (error) {
    setStatus(`Erro ao carregar empréstimos: ${error.message}`, "error");
  }
})();
