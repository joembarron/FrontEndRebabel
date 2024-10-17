import React from "react";

function Mappings({ isOpen, onClose, data, setData }) {
  function handleChanges(e) {
    setData((data) => ({ ...data, mappings: e.target.value }));
  }
  return (
    <dialog id="a" open={isOpen} className="modal-overlay">
      <article>
        <h2>Mappings</h2>
        <hr></hr>
        <section id="mappings-inputs">
          <div>
            <label>Mappings</label>
            <input
              name="mappings"
              type="text"
              value={data.mappings}
              onChange={(e) => handleChanges(e)}
              aria-label="mappings settings"
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

export default Mappings;
