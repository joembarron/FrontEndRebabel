const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');
const isWindows = process.platform === 'win32';

const venvPath = path.join(__dirname, '.venv');
const buildPath = path.join(__dirname, 'build');
const distPath = path.join(__dirname, 'dist');
const specPath = path.join(__dirname, 'rebabel_convert.spec');

const deleteIfExists = (path) => {
    if (fs.existsSync(path)) {
        if (fs.lstatSync(path).isDirectory()) {
            fs.rmdirSync(path, { recursive: true });
            console.log(`Deleted directory: ${path}`);
        } else {
            fs.unlinkSync(path);
            console.log(`Deleted file: ${path}`);
        }
    }
};

deleteIfExists(venvPath);
deleteIfExists(buildPath);
deleteIfExists(distPath);
deleteIfExists(specPath);

if (isWindows) {
    const scriptPath = path.join('.github', 'scripts', 'create_rebabel_convert_executable_windows.ps1');
    const sourcePath = path.join(__dirname, 'dist', 'rebabel_convert.exe');
    const destinationPath = path.join('node_modules', 'electron', 'dist', 'resources', 'rebabel_convert.exe');

    //create executable
    console.log('Executing PowerShell script to create executable...');

    const powershell = spawn('powershell.exe', ['-ExecutionPolicy', 'Bypass', '-File', scriptPath]);

    powershell.stdout.on('data', (data) => {
        console.log(`PowerShell Output: ${data}`);
    });

    powershell.stderr.on('data', (data) => {
        console.error(`PowerShell Error Output: ${data}`);
    });

    powershell.on('close', (code) => {
        if (code !== 0) {
            console.error(`PowerShell script exited with code ${code}`);
            return;
        }
        console.log('PowerShell script executed successfully.');

        // Copy executable to correct location
        fs.copyFile(sourcePath, destinationPath, (err) => {
            if (err) {
                console.error(`Error copying rebabel_convert.exe: ${err.message}`);
            } else {
                console.log('rebabel_convert.exe copied successfully');
            }
        });
    });
}
else {
    console.log("work in progress");
}