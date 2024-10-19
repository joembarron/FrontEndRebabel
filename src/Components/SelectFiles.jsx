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
    <div className={styles.selectFile}>
      <input
        className={styles.fileIn}
        id="file-in"
        readOnly="readonly"
        placeholder="Select File..."
        value={data.fileName.join(", ")}
        disabled={isLoading}
      />
      <button
        className={styles.btn}
        data-tooltip="Hold Ctrl to Select Multiple Files"
        id="file-in-btn"
        onClick={() => handleSelectFile()}
        disabled={isLoading}
      >
        Browse
      </button>
    </div>
  );
}

export default SelectFiles;
