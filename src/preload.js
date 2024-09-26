const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("pythonApi", {
  actions: (data) => ipcRenderer.invoke("action", [data]),
});
