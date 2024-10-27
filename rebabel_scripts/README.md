### Steps to create the executable from rebabel_convert.py using PyInstaller
1. `cd rebabel_scripts` 
2. Create and activate Python [virtual environment](https://docs.python.org/3/library/venv.html). 
    - macOS/Linux commands
        - `python3 -m venv .venv`
        - `source .venv/bin/activate`(bash/zsh)
    - Windows commands 
        - `python -m venv .venv`
        - `.venv\Scripts\activate.bat`(Command Prompt) or `.venv\Scripts\Activate.ps1`(PowerShell)
3. Run `pip install -r requirements.txt`
4. Run `python -m PyInstaller --onefile --collect-all rebabel_format rebabel_convert.py`
5. The executable(rebabel_convert) will be located in the 'dist' folder that is generated. For running the application in development mode(i.e., npm run start), copy the rebabel_convert executable into the **node_modules/electron/dist/Electron.app/Contents/Resources** folder on Mac systems and the **node_modules/electron/dist/resources** folder on Windows and Linux.

To update the rebabel_convert executable after making a change to rebabel_convert.py, delete every file from the rebabel_scripts folder except for README.md, rebabel_convert.py, .venv, requirements.txt, and then run the script again from step 4.