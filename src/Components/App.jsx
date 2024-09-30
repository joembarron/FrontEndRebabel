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
  async function rebabel() {
    const response = await window.pythonApi.rebabelConvert();
  }

  return (
    <div className="flex-base">
      <section className="input-fields">
        <div className="select-file">
          <input
            id="file-in"
            readOnly="readonly"
            placeholder="Select File..."
          />
          <button id="file-in-btn">Browse</button>
        </div>
        <div id="file-type">
          <label>File input type:</label>
          <select aria-label="Select File Type">
            <option selected value=""></option>
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
            <option selected value=""></option>
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
