document.getElementById("app").innerHTML = getLayout(
  "creditos",
  `
    <h2>Créditos</h2>

    <div class="card creditos-card">
      <h3>Bibliotecário Desktop</h3>

      <p><strong>Desenvolvedor:</strong> Lohran Cintra da Silva</p>
      <p><strong>Apelido:</strong> chamfrado</p>
      <p><strong>Função:</strong> Desenvolvedor</p>
      <p><strong>Empresa:</strong> Chamfrado's Solutions</p>

      <hr />

      <p>
        <strong>LinkedIn:</strong>
        <a href="#" id="linkLinkedin">www.linkedin.com/in/lohrancintra</a>
      </p>

      <p>
        <strong>GitHub:</strong>
        <a href="#" id="linkGithub">github.com/Chamfrado</a>
      </p>
    </div>
  `,
);

document.getElementById("linkLinkedin").addEventListener("click", (e) => {
  e.preventDefault();
  window.api.abrirLinkExterno("https://www.linkedin.com/in/lohrancintra");
});

document.getElementById("linkGithub").addEventListener("click", (e) => {
  e.preventDefault();
  window.api.abrirLinkExterno("https://github.com/Chamfrado");
});
