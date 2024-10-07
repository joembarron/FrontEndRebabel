import React from "react";

function AdditionalSettings({ isOpen, onClose, data, setData }) {
  function handleChanges(e) {
    if (e.target.name == "root") {
      setData((data) => ({ ...data, root: e.target.value }));
    } else if (e.target.name == "skip") {
      setData((data) => ({ ...data, skip: e.target.value }));
    }
  }
  return (
    <dialog id="a" open={isOpen} className="modal-overlay">
      <article>
        <h2>Additional Settings</h2>
        <hr></hr>
        <section id="additional-inputs">
          <div>
            <label>Root</label>
            <input
              name="root"
              value={data.root}
              onChange={(e) => handleChanges(e)}
              aria-label="root settings"
            />
          </div>
          <div>
            <label>Skip</label>
            <input
              name="skip"
              value={data.skip}
              onChange={(e) => handleChanges(e)}
              aria-label="skip settings"
            />
          </div>
        </section>
        <footer>
          <button onClick={onClose}>Close</button>
        </footer>
      </article>
    </dialog>
  );
}

export default AdditionalSettings;
