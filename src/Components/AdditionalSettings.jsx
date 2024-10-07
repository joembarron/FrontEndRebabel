import React from "react";

function AdditionalSettings({ isOpen, onClose }) {
  return (
    <dialog id="a" open={isOpen} className="modal-overlay">
      <article>
        <h2>Additional Settings</h2>
        <hr></hr>
        <section id="additional-inputs">
          <div>
            <label>Root</label>
            <input />
          </div>
          <div>
            <label>Skip</label>
            <input />
          </div>
        </section>
        <footer>
          <button className="backBtn" onClick={onClose}>
            Cancel
          </button>
          <button className="backBtn" onClick={onClose}>
            Confirm
          </button>
        </footer>
      </article>
    </dialog>
  );
}

export default AdditionalSettings;
