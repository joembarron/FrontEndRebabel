import React from "react";
import FlextextConfig from "./FlextextConfig.jsx";
import ElanConfig from "./ElanConfig.jsx";

function OutputFileConfig({
  isOpen,
  onClose,
  data,
  setData,
  errors,
  setErrorState,
  includedLayerValues,
  setIncludedLayerValues,
  isELANTemplateFileSelected,
  setELANTemplateFileSelected
}) {

  function getDialogConfigTitle() {
    let dialogConfigTitle = "";

    if (data.outFileType === "flextext") {
      dialogConfigTitle = "Flextext";
    } else if (data.outFileType === "elan") {
      dialogConfigTitle = "ELAN";
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
          {data.outFileType === "elan" && (
            <ElanConfig
              data={data}
              setData={setData}
              errors={errors}
              setErrorState={setErrorState}
              isELANTemplateFileSelected={isELANTemplateFileSelected}
              setELANTemplateFileSelected={setELANTemplateFileSelected}
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
