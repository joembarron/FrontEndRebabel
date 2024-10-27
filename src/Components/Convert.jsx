import React from "react";
import styles from "./Convert.module.css";

function Convert({ data, isLoading, setIsLoading, setErrorState }) {
  function preConvertCheck() {
    let errorOccurred = false;

    if (data.filePath.length === 0) {
      setErrorState(true, "Error! Please Select a File", "selectFile");
      errorOccurred = true;
    }

    if (data.inFileType === "") {
      setErrorState(true, "Error! Select File Type", "inFileType");
      errorOccurred = true;
    }

    if (data.outFileType === "") {
      setErrorState(true, "Error! Select File Type", "outFileType");
      errorOccurred = true;
    }

    if (data.nlpFileType === "combined" && delimiter === "") {
      setErrorState(true, "Error! Select File Type", "delimiter", true);
      errorOccurred = true;
    }

    if (data.nlpFileType === "separate") {
      if (data.partofSpeechFile === "") {
        setErrorState(
          true,
          "Error! Please Select a File",
          "partOfSpeechFile",
          true
        );
        errorOccurred = true;
      }

      if (data.languageFile === "") {
        setErrorState(
          true,
          "Error! Please Select a File",
          "languageFile",
          true
        );
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
        <span className="loading-status" aria-busy="true">
          Converting...
        </span>
      )}
    </div>
  );
}

export default Convert;
