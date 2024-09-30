const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("pythonApi", {
  rebabelConvert: () =>
    ipcRenderer
      .invoke("rebabelConvert")
      .then((conversionFailure) => conversionFailure),
});
