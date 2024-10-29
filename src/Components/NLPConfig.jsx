import React from "react";
import styles from "./NLPConfig.module.css";
import Error from "./Error.jsx";

function NLPConfig({ isOpen, onClose, data, errors, setErrorState, setData }) {
  //Creates copy of FileNames for selecting two file input
  const fileNames = [...data.fileName];
  fileNames.unshift("");

  function handleRadioChange(e) {
    if (e.target.id === "combined") {
      setData((data) => ({ ...data, nlpFileType: e.target.id }));
    } else if (e.target.id === "separate") {
      setData((data) => ({ ...data, nlpFileType: e.target.id }));
    }

    setErrorState(false, "", "nlpFileType");
  }

  function handleDelimiterChange(e) {
    setData((data) => ({ ...data, delimiter: e.target.value }));

    if (e.target.value.length > 1) {
      setErrorState(
        true,
        "Delimiter can only be a single character",
        "delimiter",
        true
      );
    } else if (e.target.value === "") {
      setErrorState(true, "Enter a delimiter value", "delimiter", true);
    } else {
      setErrorState(false, "", "delimiter");
    }
  }

  function handleFileChange(e) {
    if (e.target.name === "partOfSpeech") {
      setData((data) => ({ ...data, partOfSpeechFile: e.target.value }));

      if (e.target.value === "") {
        setErrorState(true, "Please Select a File", "partOfSpeechFile", true);
      } else if (e.target.value === data.languageFile) {
        setErrorState(
          true,
          "File name already choosen",
          "partOfSpeechFile",
          true
        );
      } else {
        setErrorState(false, "", "partOfSpeechFile");
      }
    } else if (e.target.name === "language") {
      setData((data) => ({ ...data, languageFile: e.target.value }));

      if (e.target.value === "") {
        setErrorState(true, "Please Select a File", "languageFile", true);
      } else if (e.target.value === data.partOfSpeechFile) {
        setErrorState(true, "File name already choosen", "languageFile", true);
      } else {
        setErrorState(false, "", "languageFile");
      }
    }
  }

  return (
    <dialog open={isOpen} className="modal-overlay">
      <article>
        <h2>NLP Configuration Settings</h2>
        <hr></hr>
        <section className={styles.nlpInput}>
          <fieldset>
            <legend>NLP File Type:</legend>
            <input
              type="radio"
              id="combined"
              name="nlpfileType"
              checked={data.nlpFileType === "combined"}
              onChange={(e) => handleRadioChange(e)}
              className={styles.combined}
              {...errors.nlpFileType.ariaProps}
            />
            <label htmlFor="combined">Combined</label>
            <input
              type="radio"
              id="separate"
              name="nlpfileType"
              checked={data.nlpFileType === "separate"}
              onChange={(e) => handleRadioChange(e)}
              {...errors.nlpFileType.ariaProps}
            />
            <label htmlFor="separate">Part of Speech and Language Files</label>
          </fieldset>
          {errors.nlpFileType.status && (
            <p className={styles.error}>Error! Select an NLP File Type</p>
          )}
          {data.nlpFileType === "combined" && (
            <>
              <div>
                <label>NLP Delimiter ('/' by default)</label>
                <input
                  type="text"
                  id="delimiter"
                  value={data.delimiter}
                  onChange={(e) => handleDelimiterChange(e)}
                  {...errors.delimiter.ariaProps}
                />
                <Error>{errors.delimiter.message}</Error>
              </div>
            </>
          )}
          {data.nlpFileType === "separate" && (
            <div>
              {data.fileName.length < 2 && (
                <p className={styles.error}>
                  Error! Please Upload a Part of Speech File and a Language File
                </p>
              )}
              {data.fileName.length > 2 && (
                <p className={styles.error}>
                  Error! Please Upload one Part of Speech File and one Language
                  File
                </p>
              )}
              {data.fileName.length === 2 && (
                <div>
                  <label>Part of Speech File</label>
                  <select
                    name="partOfSpeech"
                    onChange={(e) => handleFileChange(e)}
                    value={data.partOfSpeechFile}
                    aria-label="Select Part of Speech File"
                    {...errors.partOfSpeechFile.ariaProps}
                  >
                    {fileNames.map((name) => (
                      <option value={name} key={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <Error>{errors.partOfSpeechFile.message}</Error>
                  <label>Language File</label>
                  <select
                    name="language"
                    onChange={(e) => handleFileChange(e)}
                    value={data.languageFile}
                    aria-label="Select Language File"
                    {...errors.languageFile.ariaProps}
                  >
                    {fileNames.map((name) => (
                      <option value={name} key={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <Error>{errors.languageFile.message}</Error>
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
