const { app, Menu, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const path = require("node:path");
const { unlink } = require("node:fs");
const util = require("node:util");
const execFilePromisified = util.promisify(
  require("node:child_process").execFile
);

const FileExtensions = {
  flextext: ".flextext",
  conllu: ".conllu",
  elan: ".eaf",
  nlp_pos: ".txt",
};

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 800,
    resizable: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // menubar
  const menuTemplate = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          role: 'quit', // Closes the application
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        {
            label: 'Zoom In',
            accelerator: 'CmdOrCtrl+Plus',
            click: () => {
                const focusedWindow = BrowserWindow.getFocusedWindow();
                if (focusedWindow) {
                    focusedWindow.webContents.setZoomLevel(
                        focusedWindow.webContents.getZoomLevel() + 0.5
                    );
                }
            }
        },
        {
            label: 'Zoom Out',
            accelerator: 'CmdOrCtrl+-',
            click: () => {
                const focusedWindow = BrowserWindow.getFocusedWindow();
                if (focusedWindow) {
                    focusedWindow.webContents.setZoomLevel(
                        focusedWindow.webContents.getZoomLevel() - 0.5
                    );
                }
            }
        },
        {
            label: 'Reset Zoom',
            accelerator: 'CmdOrCtrl+0',
            click: () => {
                const focusedWindow = BrowserWindow.getFocusedWindow();
                if (focusedWindow) {
                    focusedWindow.webContents.setZoomLevel(0);
                }
            }
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Getting Started',
          click: () => {
            dialog.showMessageBox({
              type: 'info',
              title: 'Getting Started',
              message: 'Getting Started',
              detail: `1. Select the file(s) to be converted.\n` +
                      `2. Choose the desired input and output file formats.\n` +
                      `3. Configure mappings or additional settings, if applicable.\n` +
                      `4. Click "Convert" and specify the destination for the converted file.`,
              buttons: ['OK'],
            });
          },
        },
        {
          label: 'Rebabel Documentation',
          click: () => {
            shell.openExternal('https://github.com/mr-martian/rebabel-format/tree/master/docs');
          },
        },
        { type: 'separator' },
        {
          label: 'About',
          click: () => {
            dialog.showMessageBox({
              type: 'info',
              title: 'About Gap App',
              message: 'Gap App',
              detail: `Version: ${app.getVersion()}\n` +
              `\n` +
              `Welcome to Gap App! This tool is designed to simplify file format conversions with just a few clicks. Follow the steps below to quickly convert your files and customize the output to your needs.\n` +
              `\n` +
              `Linguists rely on a variety of specialized software tools to document and preserve endangered languages. A common challenge they face is the need to transfer language data between different applications, a process that currently lacks an automated and user-friendly solution. Gap App provides an efficient and intuitive solution for converting NLP output files into language data formats compatible with software such as Fieldworks Language Explorer (FLEx) and ELAN.\n` +
              `\n` +
              `Team Members:\n` +
              `- Joseph Barron: Backend Developer/Scrum Master\n` +
              `- Adassa Coimin: Frontend/Backend Developer\n` +
              `- Matthew Denslinger: Frontend Developer\n` +
              `- Elizabeth Thorner: Backend Developer/Project Manager\n` +
              `- Darren Wang: Frontend Developer`,
              buttons: ['OK'],
            });
          },
        },
      ],
    },
  ];

  // Build the menu from the template
  const menu = Menu.buildFromTemplate(menuTemplate);

  // Set the menu for the application
  Menu.setApplicationMenu(menu);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  ipcMain.handle("selectFile", async () => {
    const filePathSelect = dialog.showOpenDialogSync({
      properties: ["openFile"],
    });

    //if user cancels
    if (filePathSelect == undefined) {
      return undefined;
    }

    //gets fileName from absolute path
    const fileName = path.basename(filePathSelect[0]);

    return { filePath: filePathSelect, fileName: fileName };
  });

  ipcMain.handle("rebabelConvert", async (event, data) => {
    let conversionFailure = false;
    let outPutFileNamePath = "";

    //calls saveAs dialog if fileName and output file type aren't empty
    if (data.fileName.length === 0 || data.outFileType === "") {
      return "error";
    } else {
      outPutFileNamePath = initiateSaveAs(data);
    }

    //user cancels
    if (outPutFileNamePath === "cancelled") {
      return "cancelled";
    }

    const {
      filePath,
      fileName,
      inFileType,
      outFileType,
      delimiter,
      nlpFileType,
      partOfSpeechFile,
      languageFile,
      mappings,
      root,
      skip,
    } = data;

    // The arguments passed to execFile are hardcoded. They will be passed from the frontend once forms are present to receive input from the user.
    const rebabelConvertPath = path.join(process.resourcesPath, 'rebabel_convert');
    const tempdbPath = path.join(process.resourcesPath, 'temp.db');

    const { stdout, stderr } = await execFilePromisified(
      rebabelConvertPath,
      [
        inFileType,
        outFileType,
        filePath,
        outPutFileNamePath,
        nlpFileType,
        partOfSpeechFile,
        languageFile,
        delimiter,
        JSON.stringify(mappings),
        root,
        skip.join(","),
        tempdbPath
      ]
    );

    if (stderr) {
      console.log(error); // This is temporary minimum error handling.
      conversionFailure = true;
    } else {
      console.log("The file conversion process completed.");
    }

    unlink(tempdbPath, (err) => {
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

function initiateSaveAs(data) {
  //Calls a function to create initial output fileName for SaveAs dialog
  //I.e. takes an infile abc.inExt and turns into abc.outExt
  let outputFileName = setOutputFileName(data);

  //Gets absolute path
  let outputFileNamePath = dialog.showSaveDialogSync({
    defaultPath: outputFileName,
  });

  //user cancels SaveAs
  if (outputFileNamePath === undefined) {
    return "cancelled";
  }

  return outputFileNamePath;
}

//Takes an input FileName and creates a default fileName
//Ex: file1.eaf => file1.flextext
function setOutputFileName(data) {
  let inputFileName = data.fileName[0];

  let extension = path.extname(inputFileName);
  let nameBeforePeriod = path.basename(inputFileName, extension);

  let outputFileType = data.outFileType;

  let outputFileName = nameBeforePeriod + FileExtensions[outputFileType];

  return outputFileName;
}
