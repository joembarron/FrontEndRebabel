import React from "react";
import NLPConfig from "./NLPConfig.jsx";

function InputFileConfig({
  isOpen,
  onClose,
  data,
  errors,
  setData,
  setErrorState,
}) {
  let dialogConfigTitle;

  if (data.inFileType === "nlp_pos") {
    dialogConfigTitle = "NLP";
  }
  return (
    <dialog open={isOpen} className="modal-overlay">
      <article>
        <h2>{dialogConfigTitle} Configuration Settings</h2>
        <hr></hr>
        <section>
          {data.inFileType == "nlp_pos" && (
            <NLPConfig
              data={data}
              errors={errors}
              setErrorState={setErrorState}
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

export default InputFileConfig;
