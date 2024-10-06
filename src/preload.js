const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("pythonApi", {
  getFile: () => ipcRenderer.invoke("selectFile"),
  rebabelConvert: () =>
    ipcRenderer
      .invoke("rebabelConvert")
      .then((conversionFailure) => conversionFailure),
});
