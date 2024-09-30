import React, { useState } from "react";

const initialState = {
  filePath: "",
  fileName: "",
  inFileType: "",
  outFileType: "",
  mappings: [],
  additionalSettings: [],
};

function App() {
  const [data, setData] = useState(initialState);
  async function rebabel() {
    const response = await window.pythonApi.rebabelConvert();
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

  return (
    <div className="flex-base">
      <section className="input-fields">
        <div className="select-file">
          <input
            id="file-in"
            readOnly="readonly"
            placeholder="Select File..."
            value={data.fileName}
          />
          <button id="file-in-btn" onClick={() => handleSelectFile()}>
            Browse
          </button>
        </div>
        <div id="file-type">
          <label>File input type:</label>
          <select aria-label="Select File Type">
            <option defaultValue=""></option>
            <option value="flextext">Flextext</option>
            <option value="conllu">Conllu</option>
            <option value="nlp_pos">NLP</option>
          </select>
        </div>
        <div>Mappings?</div>
        <div>Additional Settings?</div>
        <div id="file-type">
          <label>File output type:</label>
          <select aria-label="Select File Type">
            <option defaultValue=""></option>
            <option value="flextext">Flextext</option>
            <option value="nlp_pos">NLP</option>
          </select>
        </div>
        <div className="convert-btn">
          <button id="convertBtn" onClick={() => rebabel()}>
            Convert
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
