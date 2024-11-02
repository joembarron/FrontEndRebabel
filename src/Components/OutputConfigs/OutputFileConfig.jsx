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
  let dialogConfigTitle;

  if (data.inFileType === "flextext") {
    dialogConfigTitle = "Flextext";
  }
  return (
    <dialog open={isOpen} className="modal-overlay">
      <article>
        <h2>{dialogConfigTitle} Configuration Settings</h2>
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
