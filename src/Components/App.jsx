import React, { useState } from "react";
import Help from './Help.jsx';
import About from './About.jsx';

function App() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleOpenHelp = () => {
    setIsHelpOpen(true);
  };

  const handleCloseHelp = () => {
    setIsHelpOpen(false);
  };

  const handleOpenAbout = () => {
    setIsAboutOpen(true);
  };

  const handleCloseAbout = () => {
    setIsAboutOpen(false);
  };

  return (
    <div className="flex-base">
      <header>
        <button onClick={handleOpenHelp}>Help</button>
        <h2>Gap App</h2>
        <button onClick={handleOpenAbout}>About</button>
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
      {/* Dialog component */}
      <Help isOpen={isHelpOpen} onClose={handleCloseHelp} />
      <About isOpen={isAboutOpen} onClose={handleCloseAbout} />
    </div>
  );
}

export default App;
