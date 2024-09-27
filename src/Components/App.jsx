import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  async function action(command) {
    const response = await window.pythonApi.actions(command);
    setText(() => response);
  }
  return (
    <div className="flex-base">
      <header>
        <h1>Gap App</h1>
      </header>
      <section className="input-fields">
        <div className="select-file">
          <input
            id="file-in"
            readOnly="readonly"
            placeholder="Select File..."
          />
          <button id="file-in-btn">Browse</button>
        </div>
        <button id="copyBtn">Copy</button>
        <button id="importBtn" onClick={() => action("import")}>
          Import
        </button>
        <button id="exportBtn" onClick={() => action("export")}>
          Export
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
