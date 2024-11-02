import React from "react";
import FlextextConfig from "./FlextextConfig.jsx";

function OutputFileConfig({
  isOpen,
  onClose,
  data,
  errors,
  setErrorState,
  includedLayerValues,
  setIncludedLayerValues,
}) {

  function getDialogConfigTitle() {
    let dialogConfigTitle = "";

    if (data.outFileType === "flextext") {
      dialogConfigTitle = "Flextext";
    }

    return dialogConfigTitle;
  }
  
  return (
    <dialog open={isOpen} className="modal-overlay">
      <article>
        <h2>{getDialogConfigTitle()} Configuration Settings</h2>
        <hr></hr>
        <section>
          {data.outFileType === "flextext" && (
            <FlextextConfig
              data={data}
              errors={errors}
              setErrorState={setErrorState}
              includedLayerValues={includedLayerValues}
              setIncludedLayerValues={setIncludedLayerValues}
            />
          )}
        </section>
        <footer>
          <button onClick={onClose}>Close</button>
        </footer>
      </article>
    </dialog>
  );
}

export default OutputFileConfig;
