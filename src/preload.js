const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("pythonApi", {
  actions: (data) => ipcRenderer.invoke("action", [data]),
  rebabelConvert: () => ipcRenderer.invoke('rebabelConvert').then(conversionFailure => conversionFailure)
});
