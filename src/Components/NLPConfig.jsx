import React from "react";

function NLPConfig({ isOpen, onClose, data, setData }) {
  function handleRadioChange(e) {
    if (e.target.id === "combined") {
      setData((data) => ({ ...data, nlpFileType: e.target.id }));
    } else if (e.target.id === "separate") {
      setData((data) => ({ ...data, nlpFileType: e.target.id }));
    }
  }

  function handleDelimiterChange(e) {
    setData((data) => ({ ...data, delimiter: e.target.value }));
  }
  return (
    <dialog open={isOpen} className="modal-overlay">
      <article>
        <h2>NLP Configuration Settings</h2>
        <hr></hr>
        <section>
          <fieldset>
            <legend>NLP File Type:</legend>
            <input
              type="radio"
              id="combined"
              name="nlpfileType"
              checked={data.nlpFileType === "combined"}
              onChange={(e) => handleRadioChange(e)}
            />
            <label htmlFor="combined">Combined</label>
            <input
              type="radio"
              id="separate"
              name="nlpfileType"
              checked={data.nlpFileType === "separate"}
              onChange={(e) => handleRadioChange(e)}
            />
            <label htmlFor="separate">Part of Speech and Language Files</label>
          </fieldset>
          {data.nlpFileType === "combined" && (
            <div>
              <label>NLP Delimiter</label>
              <input
                type="text"
                id="delimiter"
                value={data.delimiter}
                onChange={(e) => handleDelimiterChange(e)}
              />
            </div>
          )}
        </section>
        <footer>
          <button onClick={onClose}>Close</button>
        </footer>
      </article>
    </dialog>
  );
}

export default NLPConfig;
