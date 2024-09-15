//test about sending data to main
const activateTest = document.getElementById("test");

activateTest.addEventListener("click", () => {
  const getData = document.getElementById("text-input").value;

  getPythonData(getData);
});

const getPythonData = async (getData) => {
  const response = await window.py.fireText(getData);

  const paragraph = document.getElementById("python-text");
  paragraph.innerText = response;
};
