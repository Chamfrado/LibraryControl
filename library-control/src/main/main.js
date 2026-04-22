const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { listarAcervo } = require('./db/acervo.repo');

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  win.loadFile(path.join(__dirname, '../renderer/index.html'));
}

app.whenReady().then(() => {
  ipcMain.handle('acervo:listar', () => {
    return listarAcervo();
  });

  createWindow();
});