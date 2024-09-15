## Gap App - Senior Project (CIS4914)

### Group Members
- Joseph Barron: Backend Developer/Scrum Master 
- Adassa Coimin: Frontend/Backend Developer 
- Matthew Denslinger: Frontend Developer  
- Elizabeth Thorner: Backend Developer/Project Manager  
- Darren Wang: Frontend Developer


### Abstract 

Linguists use a variety of software tools to document endangered languages. They frequently need to move language data stored in one program into another, a process for which no automated and user-friendly tool exists. There is also no efficient way to import language data from the output of natural language processing (NLP) models into these software tools. The Gap App desktop application will enable linguists to convert between NLP output files and language data file formats used by software like Fieldworks Language Explorer (FLEx) and ELAN. The app will facilitate the speedy conversion between language data formats through an easy-to-use interface. 


### Help

run <code>npm install</code>

The python file term.py contains the code where you can have the command line argument of <code>-msg="Your Message Here"</code>. Or you can experiment with whatever command line stuff you want.

To make term.py an executable move term.py out of the project to a separate folder. If you want you can create a virtual environment. Then install pyinstaller, <code>pip install pyinstaller</code> and run the command <code>pyinstaller -F term.py</code> In the dist folder you should find an executable titled, term (on windows, this is term.exe). You can move that back into the project to replace the current term. It's also possible in main.js in the function "testText" you might need to change the term to whatever is apporipriate for your OS.

Use the command <code>npm run start</code> to run the app
Use the command <code>npm run make</code> to build.

If you build the app you should find the electron-test executable in the out folder in the folder electron-test-[linux or windows or mac] folder.
