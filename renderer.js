//test about sending data to main
const activateCopy = document.getElementById("copyBtn");
const activateImport = document.getElementById("importBtn");
const activateExport = document.getElementById("exportBtn");

activateCopy.addEventListener("click", () => {
  const getData = document.getElementById("text-input").value;

  getPythonData(getData);
});

activateImport.addEventListener("click", () => {
  getPythonData("import");
});

activateExport.addEventListener("click", () => {
  getPythonData("export");
});

const getPythonData = async (getData) => {
  const response = await window.py.fireText(getData);

  const paragraph = document.getElementById("python-text");
  paragraph.innerText = response;
};
