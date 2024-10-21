import React from "react";
import styles from "./SelectFiles.module.css";

function SelectFiles({ data, isLoading, setData }) {
  async function handleSelectFile() {
    //returns object with filePath and fileName
    const response = await window.pythonApi.getFile();

    if (response !== undefined) {
      setData((data) => ({
        ...data,
        fileName: response.fileName,
        filePath: response.filePath,
      }));
    }
  }
  return (
    <>
      <div>
        <label>Select File</label>
      </div>
      <div className={styles.selectFile}>
        <button
          className={styles.btn}
          id="file-in-btn"
          onClick={() => handleSelectFile()}
          disabled={isLoading}
        >
          Browse
        </button>
        <div className={styles.container}>
          <div className={styles.backgroundContainer}>
            <div className={styles.chipsContainer}></div>
          </div>
          {/* <small>Error goes here!</small> */}
        </div>
      </div>
    </>
  );
}

export default SelectFiles;
