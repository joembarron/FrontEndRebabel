import React from "react";

function Mappings({ isOpen, onClose, data, setData }) {
  function handleChanges(e) {
    data.mappings[e.target.id] = {
      ...data.mappings[e.target.id],
      [e.target.name]: e.target.value,
    };

    setData((data) => ({ ...data }));
  }

  return (
    <dialog id="a" open={isOpen} className="modal-overlay">
      <article>
        <h2>Mappings</h2>
        <hr></hr>
        <section id="mappings-inputs">
          <div className="mappings-container">
            <div className="input-container left">
              <label>In Type</label>
              <input
                name="in_type"
                id="0"
                type="text"
                value={data.mappings[0].in_type}
                onChange={(e) => handleChanges(e)}
                aria-label="mappings settings"
              />
            </div>
            <div className="input-container">
              <label>Out Type</label>
              <input
                name="out_type"
                id="0"
                type="text"
                value={data.mappings[0].out_type}
                onChange={(e) => handleChanges(e)}
                aria-label="mappings settings"
              />
            </div>
          </div>
          <div className="mappings-container">
            <div className="input-container left">
              <label>In Feature</label>
              <input
                name="in_feature"
                type="text"
                id="1"
                value={data.mappings[1].in_feature}
                onChange={(e) => handleChanges(e)}
                aria-label="mappings settings"
              />
            </div>
            <div className="input-container">
              <label>Out Feature</label>
              <input
                name="out_feature"
                type="text"
                id="1"
                value={data.mappings[1].out_feature}
                onChange={(e) => handleChanges(e)}
                aria-label="mappings settings"
              />
            </div>
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
