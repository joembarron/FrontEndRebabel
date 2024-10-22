import React from "react";

function OutputFileConfig({ isOpen, onClose, data, setData }) {

  function handleChanges(e) {
    if (e.target.name == "root") {
      setData((data) => ({ ...data, root: e.target.value }));
    } else if (e.target.name == "skip") {
      setData((data) => ({ ...data, skip: e.target.value }));
    }
  }

  return (
    <dialog open={isOpen} className="modal-overlay">
      <article>
        <h2>Configuration Settings</h2>
        <hr></hr>
        <section className="output">
        {data.outFileType === "flextext" && 
           <>
            <div>
            <label>Select the highest level non-empty layer being used. Set to "phrase" by default.</label>
            <select
              name="root"
              value={data.root}
              onChange={(e) => handleChanges(e)}
              aria-label="root settings"
            >
              <option value="interlinear-text">interlinear-text</option>
              <option value="paragraph">paragraph</option>
              <option value="phrase">phrase</option>
              <option value="word">word</option>
              <option value="morph">morph</option>
            </select>
          </div>
          <div>
            <label>Input any layers to skip, if any, separated by commas. Set to "morph" by default.</label>
            <input
              name="skip"
              type="text"
              value={data.skip}
              onChange={(e) => handleChanges(e)}
              aria-label="skip settings"
            />
            </div>
          </>
          }
        </section>
        <footer>
          <button onClick={onClose}>Close</button>
        </footer>
      </article>
    </dialog>
  );
}

export default OutputFileConfig;