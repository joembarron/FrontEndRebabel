import React, { useState } from "react";
import Help from "./Help.jsx";
import About from "./About.jsx";
import AdditionalSettings from "./AdditionalSettings.jsx";

const initialState = {
  filePath: [],
  fileName: [],
  inFileType: "",
  outFileType: "",
  mappings: [],
  root: "",
  skip: "",
};

function App() {
  //Sets state for file conversion
  const [data, setData] = useState(initialState);
  //Set state for modals
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAddSettingsOpen, setAddSettingsOpen] = useState(false);

  async function convertFiles() {
    const response = await window.pythonApi.rebabelConvert(data);
  }

  async function handleSelectFile() {
    //returns object with filePath and fileName
    const response = await window.pythonApi.getFile();

    if (response !== undefined) {
      setData((data) => ({
        ...data,
        fileName: response.fileName,
        filePath: response.filePath,
      }));
    }
  }

  function handleSelectType(e) {
    if (e.target.name === "inputType") {
      setData((data) => ({ ...data, inFileType: e.target.value }));
    } else if (e.target.name === "outputType") {
      setData((data) => ({ ...data, outFileType: e.target.value }));
    }
  }

  return (
    <div className="container flex-base">
      <header>
        <button onClick={() => setIsHelpOpen(!isHelpOpen)}>Help</button>
        <h2>Gap App</h2>
        <button onClick={() => setIsAboutOpen(!isAboutOpen)}>About</button>
      </header>

      <section className="input-fields">
        <div className="select-file">
          <input
            id="file-in"
            readOnly="readonly"
            placeholder="Select File..."
            value={data.fileName.join(", ")}
          />
          <button
            data-tooltip="Hold Ctrl to Select Multiple Files"
            id="file-in-btn"
            onClick={() => handleSelectFile()}
          >
            Browse
          </button>
        </div>
        <div id="file-type">
          <label>File input type</label>
          <select
            aria-label="Select File Type"
            name="inputType"
            onChange={(e) => handleSelectType(e)}
          >
            <option defaultValue=""></option>
            <option value="flextext">Flextext</option>
            <option value="conllu">Conllu</option>
            <option value="nlp_pos">NLP</option>
          </select>
        </div>
        <div id="file-type">
          <label>File output type</label>
          <select
            aria-label="Select File Type"
            name="outputType"
            onChange={(e) => handleSelectType(e)}
          >
            <option defaultValue=""></option>
            <option value="flextext">Flextext</option>
            <option value="nlp_pos">NLP</option>
          </select>
        </div>
        <div className="settings-container">
          <button> Mappings</button>
          <button onClick={() => setAddSettingsOpen(true)}>
            Additional Settings
          </button>
        </div>
        <div className="convert-btn">
          <button id="convertBtn" onClick={() => convertFiles()}>
            Convert
          </button>
        </div>
      </section>
      {/* Dialog component */}
      <Help isOpen={isHelpOpen} onClose={() => setIsHelpOpen(!isHelpOpen)} />
      <About
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(!isAboutOpen)}
      />
      {isAddSettingsOpen && (
        <AdditionalSettings
          isOpen={isAddSettingsOpen}
          onClose={() => setAddSettingsOpen(!isAddSettingsOpen)}
          data={data}
          setData={setData}
        />
      )}
    </div>
  );
}

export default App;
