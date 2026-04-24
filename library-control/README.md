# 📚 Bibliotecário Desktop

<p align="center">
  <img src="https://img.shields.io/badge/status-stable-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/platform-Windows-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Electron-App-purple?style=for-the-badge" />
</p>

<p align="center">
  Sistema completo para gerenciamento de bibliotecas escolares,<br>
  com foco em <strong>simplicidade, acessibilidade e funcionamento offline</strong>.
</p>

---

## 🎥 Demonstração

> 💡 Aqui você pode colocar um GIF ou imagem do sistema rodando

```md
![Preview do sistema](./docs/preview.gif)

📌 (Sugestão: grave um GIF com o ShareX ou ScreenToGif)

🚀 Sobre o projeto

O Bibliotecário Desktop surgiu a partir de uma necessidade real:

Muitas escolas e bibliotecas não possuem recursos financeiros para infraestrutura online, nem condições técnicas para manter um servidor local dedicado.

Pensando nisso, o sistema foi projetado para:

funcionar 100% offline
não depender de servidores
ser simples de instalar e usar
rodar em qualquer computador comum
🧠 Decisão de arquitetura
🖥️ Electron → aplicação desktop fácil de distribuir (.exe)
🗄️ SQLite → banco leve, sem servidor

👉 Resultado:
Um sistema rápido, portátil e independente de infraestrutura

🎯 Público-alvo
🏫 Escolas públicas
📚 Bibliotecas escolares
🏘️ Bibliotecas comunitárias
💻 Ambientes com poucos recursos tecnológicos
✨ Funcionalidades
📚 Acervo
Cadastro de livros com capa
Categorias e tipos
Controle de quantidade
Histórico por livro
👥 Usuários
Cadastro completo
Níveis de acesso (Admin, Aluno, Operador)
Histórico de empréstimos
🔄 Empréstimos
Registro rápido
Controle automático de estoque
Devolução com 1 clique
Bloqueio automático de inadimplentes
⚠️ Inadimplentes
Lista automática de atrasos
Cálculo de dias em atraso
Exportação em PDF
📊 Relatórios
CSV (acervo, usuários, empréstimos)
PDF (empréstimos e inadimplentes)
📥 Importação
Importação via CSV
Validação completa
Atualização automática (upsert)
Relatório de erros
💾 Backup
Backup manual
Backup automático ao fechar
Restauração do sistema
🧠 Tecnologias
Electron
Node.js
SQLite (better-sqlite3)
HTML / CSS / JavaScript
PDFKit
📦 Instalação (dev)
git clone https://github.com/Chamfrado/bibliotecario-desktop.git
cd bibliotecario-desktop
npm install
npm start
🛠️ Build (.exe)
npm run build

📁 Saída:

/dist
📥 Download

👉 Acesse a aba Releases:

🔗 https://github.com/Chamfrado/bibliotecario-desktop/releases

📁 Estrutura
src/
├── main/ # Backend (Electron + DB)
├── renderer/ # Interface (UI)
├── db/ # Migrations e repositórios
🔐 Regras de negócio
Usuários com atraso não podem pegar livros
Controle automático de estoque
Histórico completo
Sistema 100% offline
🤝 Contribuição

Contribuições são MUITO bem-vindas!

💡 Você pode ajudar com:
UI/UX
Novas features
Correções de bugs
Refatoração
🚀 Como contribuir:
fork o projeto
crie uma branch: feature/minha-feature
commit suas mudanças
abra um Pull Request
💡 Roadmap (futuro)
📷 Leitor de código de barras (ISBN)
💰 Controle de multas
🌐 Versão SaaS (web)
🏫 Multi-escola
📊 Dashboards com gráficos
👨‍💻 Autor

Lohran Cintra da Silva
💡 Desenvolvedor
🏢 Chamfrado's Solutions

🔗 LinkedIn: https://www.linkedin.com/in/lohrancintra

🐙 GitHub: https://github.com/Chamfrado

⭐ Apoie o projeto

Se você gostou:

👉 Deixe uma ⭐ no repositório
👉 Compartilhe com outras escolas

🧾 Licença

MIT License
```
