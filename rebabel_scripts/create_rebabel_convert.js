const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const isWindows = process.platform === 'win32';

if (isWindows) {
    const scriptPath = path.join('.github', 'scripts', 'create_rebabel_convert_executable_windows.ps1');
    const sourcePath = path.join(__dirname, 'dist', 'rebabel_convert.exe');
    const destinationPath = path.join('node_modules', 'electron', 'dist', 'resources', 'rebabel_convert.exe');

    //create executable
    exec(`powershell.exe -ExecutionPolicy Bypass -File "${scriptPath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Script error: ${stderr}`);
            return;
        }
        console.log(stdout);

        //copy executable to correct location
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
    console.log("temp");
}