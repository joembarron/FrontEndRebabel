import React, { useState } from "react";
import Error from "./Error.jsx";
import styles from "./Mappings.module.css";

function Mappings({ isOpen, onClose, data, setData, errors, setErrorState }) {
  const [isAddTypeMappingOpen, setAddTypeMappingOpen] = useState(false);
  const [isAddFeatureMappingOpen, setAddFeatureMappingOpen] = useState(false);
  const [inType, setInType] = useState("");
  const [outType, setOutType] = useState("");
  const [inFeature, setInFeature] = useState("");
  const [outFeature, setOutFeature] = useState("");

  function handleInputChanges(e) {
    if (e.target.name === "in_type") {
      setInType(e.target.value);
    } else if (e.target.name === "out_type") {
      setOutType(e.target.value);
    } else if (e.target.name === "in_feature") {
      setInFeature(e.target.value);
    } else {
      setOutFeature(e.target.value);
    }
  }

  function handleRemoveMapping(mappingTypeIndex, mappingIndex) {
    const newMappings = data.mappings[mappingTypeIndex].filter(
      (_, i) => i !== mappingIndex
    );
    data.mappings[mappingTypeIndex] = newMappings;
    if (data.mappings[0].length === 0 && data.mappings[1].length === 0) {
      setErrorState(true, "Mappings must be provided", "mappings");
    }
    setData((data) => ({ ...data }));
  }

  function resetTypeDialog(isSubmit) {
    if (isSubmit) {
      setErrorState(false, "", "mappings");
    }
    setAddTypeMappingOpen(false);
    setInType("");
    setOutType("");
  }

  function resetFeatureDialog(isSubmit) {
    if (isSubmit) {
      setErrorState(false, "", "mappings");
    }
    setAddFeatureMappingOpen(false);
    setInFeature("");
    setOutFeature("");
  }

  const typeMappings = data.mappings[0].map((pair, index) => {
    return (
      <li>
        {pair.in_type} -{">"} {pair.out_type}
        <button
          className={styles.removeButton}
          onClick={() => handleRemoveMapping(0, index)}
        >
          Remove
        </button>
      </li>
    );
  });

  const featureMappings = data.mappings[1].map((pair, index) => {
    return (
      <li>
        {pair.in_feature} -{">"} {pair.out_feature}
        <button
          className={styles.removeButton}
          onClick={() => handleRemoveMapping(1, index)}
        >
          Remove
        </button>
      </li>
    );
  });

  const typeDialog = (
    <dialog open={isAddTypeMappingOpen}>
      <article>
        <div className={styles.mappingsContainer}>
          <div className={`${styles.inputContainer} ${styles.left}`}>
            <label>In Type</label>
            <input
              name="in_type"
              type="text"
              value={inType}
              onChange={(e) => handleInputChanges(e)}
              aria-label="In type settings"
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Out Type</label>
            <input
              name="out_type"
              type="text"
              value={outType}
              onChange={(e) => handleInputChanges(e)}
              aria-label="Out type settings"
            />
          </div>
        </div>
        <footer>
          <button
            onClick={() =>
              data.mappings[0].push({ in_type: inType, out_type: outType }) &&
              resetTypeDialog(true)
            }
          >
            Submit
          </button>
          <button onClick={() => resetTypeDialog(false)}>Cancel</button>
        </footer>
      </article>
    </dialog>
  );

  const featureDialog = (
    <dialog open={isAddFeatureMappingOpen}>
      <article>
        <div className={styles.mappingsContainer}>
          <div className={`${styles.inputContainer} ${styles.left}`}>
            <label>In Feature</label>
            <input
              name="in_feature"
              type="text"
              value={inFeature}
              onChange={(e) => handleInputChanges(e)}
              aria-label="In feature settings"
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Out Feature</label>
            <input
              name="out_feature"
              type="text"
              value={outFeature}
              onChange={(e) => handleInputChanges(e)}
              aria-label="Out feature settings"
            />
          </div>
        </div>
        <footer>
          <button
            onClick={() =>
              data.mappings[1].push({
                in_feature: inFeature,
                out_feature: outFeature,
              }) && resetFeatureDialog(true)
            }
          >
            Submit
          </button>
          <button onClick={() => resetFeatureDialog(false)}>Cancel</button>
        </footer>
      </article>
    </dialog>
  );

  return (
    <dialog id="a" open={isOpen} className="modal-overlay">
      <article>
        <h2>Mappings</h2>
        <hr></hr>
        <div>
          <label>Current Type Mappings:</label>
          <ul>{typeMappings}</ul>
          <label>Current Feature Mappings:</label>
          <ul>{featureMappings}</ul>
        </div>
        <section>
          <div className={styles.mappingsContainer}>
            <div className={styles.typeButtonContainer}>
              <button onClick={() => setAddTypeMappingOpen(true)}>
                Add New Type Mapping
              </button>
              {typeDialog}
            </div>
            <div className={styles.inputContainer}>
              <button onClick={() => setAddFeatureMappingOpen(true)}>
                Add New Feature Mapping
              </button>
              {featureDialog}
            </div>
          </div>
          <Error>{errors.mappings.message}</Error>
        </section>
        <footer>
          <button onClick={onClose}>Close</button>
        </footer>
      </article>
    </dialog>
  );
}

export default Mappings;
