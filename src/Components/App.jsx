import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  async function action(command) {
    const response = await window.pythonApi.actions(command);
    setText(() => response);
  }

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
        <div id="file-input-type">
          <label>File input type:</label>
          <select aria-label="Select File Type">
            <option selected value=""></option>
            <option value="flextext">Flextext</option>
            <option value="conllu">Conllu</option>
            <option value="nlp_pos">NLP</option>
          </select>
        </div>
        <button id="copyBtn">Copy</button>
        <button id="importBtn" onClick={() => action("import")}>
          Import
        </button>
        <button id="exportBtn" onClick={() => action("export")}>
          Export
        </button>
        <button id="convertBtn" onClick={() => rebabel()}>
          Convert
        </button>
        <div>
          <h2>Output:</h2>
          <p id="python-text"></p>
        </div>
        <div>
          <span id="text">{text}</span>
        </div>
      </section>
    </div>
  );
}

export default App;
