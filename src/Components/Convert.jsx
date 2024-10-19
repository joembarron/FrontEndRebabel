import React from "react";
import styles from "./Convert.module.css";

function Convert({ data, isLoading, setIsLoading }) {
  async function convertFiles() {
    setIsLoading(true);
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
