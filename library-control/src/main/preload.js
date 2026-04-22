const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  listarAcervo: () => ipcRenderer.invoke('acervo:listar')
});