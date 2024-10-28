import React from "react";
import styles from "./Convert.module.css";

function Convert({ data, isLoading, setIsLoading, setErrorState }) {
  function preConvertCheck() {
    let errorOccurred = false;

    if (data.filePath.length === 0) {
      setErrorState(true, "Select a File", "selectFile");
      errorOccurred = true;
    }

    if (data.inFileType === "") {
      setErrorState(true, "Select a File Type", "inFileType", true);
      errorOccurred = true;
    }

    if (data.outFileType === "") {
      setErrorState(true, "Select a File Type", "outFileType", true);
      errorOccurred = true;
    }

    if (data.nlpFileType === "") {
      setErrorState(true, "Select an NLP File Type");
    }

    if (data.nlpFileType === "combined" && data.delimiter === "") {
      setErrorState(true, "Enter a delimiter value", "delimiter", true);
      errorOccurred = true;
    }

    if (data.nlpFileType === "separate") {
      if (data.partofSpeechFile === "") {
        setErrorState(true, "Please Select a File", "partOfSpeechFile", true);
        errorOccurred = true;
      }

      if (data.languageFile === "") {
        setErrorState(true, "Please Select a File", "languageFile", true);
        errorOccurred = true;
      }
    }

    return errorOccurred;
  }
  async function convertFiles() {
    setIsLoading(true);

    //if an error is thrown
    if (preConvertCheck()) {
      setIsLoading(false);
      return;
    }
    const response = await window.pythonApi.rebabelConvert(data);

    setIsLoading(false);
  }
  return (
    <div className={styles.convertBtn}>
      {!isLoading && (
        <button
          id="convertBtn"
          onClick={() => convertFiles()}
          disabled={isLoading}
        >
          Convert
        </button>
      )}
      {isLoading && (
        <span className={styles.loadingStatus} aria-busy="true">
          Converting...
        </span>
      )}
    </div>
  );
}

export default Convert;
