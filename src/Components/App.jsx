import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  async function action(action) {
    const response = await window.pythonApi.actions(action);
    setText(() => response);
  }
  return (
    <div>
      <h1>Gap App</h1>
      <p></p>
      <input type="text" id="text-input" />
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
    </div>
  );
}

export default App;
