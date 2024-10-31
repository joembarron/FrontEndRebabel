import React from "react";
import styles from "./DisplayResults.module.css";

function DisplayResults({
  isOpen,
  onClose,
  data,
  resetData,
  conversionResult,
}) {
  let title = "Error!";
  if (conversionResult.success) {
    title = "Success!";
  }

  let message = "";
  let conversionFileName = conversionResult.convertedFileName;

  if (conversionResult.success) {
    message = `${data.fileName.toString()} was sucessfully converted to ${conversionFileName}`;
  } else {
    message += conversionResult.message;
  }

  function handleOnSuccessClose() {
    resetData();
    onClose();
  }

  function handleOnErrorClearData() {
    resetData();
  }

  return (
    <dialog open={isOpen} className="modal-overlay">
      <article>
        <h2
          className={
            conversionResult.success
              ? `${styles.successResult}`
              : `${styles.errorResult}`
          }
        >
          {title}
        </h2>
        <hr></hr>
        <section>
          <p>{message}</p>
          {!conversionResult.success && (
            <p>
              You can either clear data to try a new conversion process or close
              and alter inputted data
            </p>
          )}
        </section>
        <footer>
          {conversionResult.success ? (
            <button onClick={handleOnSuccessClose}>Close</button>
          ) : (
            <>
              <button onClick={handleOnErrorClearData}>Clear Data</button>{" "}
              <button onClick={onClose}>Close</button>
            </>
          )}
        </footer>
      </article>
    </dialog>
  );
}

export default DisplayResults;
