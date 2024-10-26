import React from "react";
import styles from "./Convert.module.css";

function Convert({ data, isLoading, setIsLoading, setErrorState }) {
  function preConvertCheck() {
    if (data.filePath.length === 0) {
      setErrorState(true, "Error! Please Select a File", "selectFile");
      return true;
    }
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
