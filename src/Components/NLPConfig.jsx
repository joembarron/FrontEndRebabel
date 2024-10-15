import React from "react";

function NLPConfig({ isOpen, onClose }) {
  return (
    <dialog open={isOpen} className="modal-overlay">
      <article>
        <h2>NLP Configuration Settings</h2>
        <hr></hr>
        <section>
          <fieldset>
            <legend>NLP File Type:</legend>
            <input type="radio" id="combined" name="nlp-fileType" />
            <label htmlFor="combined">Combined</label>
            <input type="radio" id="separate" name="nlp-fileType" />
            <label htmlFor="separate">Part of Speech and Language Files</label>
          </fieldset>
        </section>
        <footer>
          <button onClick={onClose}>Close</button>
        </footer>
      </article>
    </dialog>
  );
}

export default NLPConfig;
