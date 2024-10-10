const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("pythonApi", {
  getFile: () => ipcRenderer.invoke("selectFile"),
  rebabelConvert: (data) => ipcRenderer.invoke("rebabelConvert", data),
});
