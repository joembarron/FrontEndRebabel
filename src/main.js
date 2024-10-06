const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("node:path");
const { unlink } = require("node:fs");
const util = require("node:util");
const execFilePromisified = util.promisify(
  require("node:child_process").execFile
);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  ipcMain.handle("selectFile", async () => {
    const filePath = dialog.showOpenDialogSync({
      properties: ["openFile"],
    });

    //if user cancels
    if (filePath == undefined) {
      return undefined;
    }

    //gets fileName from absolute path
    const fileName = path.basename(filePath[0]);

    return { filePath: filePath[0], fileName: fileName };
  });

  ipcMain.handle("rebabelConvert", async (event) => {
    let conversionFailure = false;

    // The arguments passed to execFile are hardcoded. They will be passed from the frontend once forms are present to receive input from the user.
    const { stdout, stderr } = await execFilePromisified(
      "./rebabel_scripts/rebabel_convert",
      [
        "nlp_pos",
        "flextext",
        "/",
        "nlp_pos.txt",
        '{"mappings": [{"in_type": "sentence", "out_type": "phrase"},{"in_feature": "UD:upos", "out_feature": "FlexText:en:pos"},{"in_feature": "UD:form", "out_feature": "FlexText:en:txt"}]}',
      ]
    );

    if (stderr) {
      console.log(error); // This is temporary minimum error handling.
      conversionFailure = true;
    } else {
      console.log("The file conversion process completed.");
    }

    unlink("./temp.db", (err) => {
      if (err) {
        console.error(`Error removing the temp.db SQLite database.`);
        conversionFailure = true;
      } else {
        console.log(`The temp.db SQLite database has been removed.`);
      }
    });

    return conversionFailure;
  });

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
