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

  function handleFileChange(e) {
    if (e.target.name === "partOfSpeech") {
      setData((data) => ({ ...data, partOfSpeechFile: e.target.value }));
    } else if (e.target.name === "language") {
      setData((data) => ({ ...data, languageFile: e.target.value }));
    }
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
          {data.nlpFileType === "separate" && (
            <div>
              {data.fileName.length < 2 && (
                <p>
                  Error! Please Upload a Part of Speech File and a Language File
                </p>
              )}
              {data.fileName.length === 2 && (
                <div>
                  <label>Part of Speech File</label>
                  <select
                    name="partOfSpeech"
                    onChange={(e) => handleFileChange(e)}
                    aria-label="Select Part of Speech File"
                  >
                    <option defaultValue={""}></option>
                    {data.fileName.map((name) => (
                      <option value={name} key={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <label>Language File</label>
                  <select
                    name="language"
                    onChange={(e) => handleFileChange(e)}
                    aria-label="Select Language File"
                  >
                    <option defaultValue={""}></option>
                    {data.fileName.map((name) => (
                      <option value={name} key={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
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
