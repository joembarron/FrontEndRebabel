const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const execFile = require("node:child_process").execFile;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
  ipcMain.handle("testText", (event, value) => {
    return new Promise((resolve, reject) => {
      execFile(
        "./resources/main.exe",
        [`${value}`, "resources/config.toml"],
        (error, stdout, stderror) => {
          if (error) {
            console.log(error);
          }
          resolve(stdout ? stdout : stderror);
        }
      );
    });
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
