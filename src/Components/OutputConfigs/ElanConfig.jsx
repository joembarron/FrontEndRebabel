import React, { useState } from "react";
import Chip from "../Chip.jsx";
import Error from "../Error.jsx";
import styles from "./ElanConfig.module.css";

function ElanConfig({
  data,
  setData,
  errors,
  setErrorState,
  isELANTemplateFileSelected,
  setELANTemplateFileSelected,
}) {
  //Template fileName
  const [fileName, setFileName] = useState([]);

  async function handleSelectFile() {
    //Pre dialog check
    if (fileName.length === 1) {
      setErrorState(
        true,
        "Only one template file can be selected",
        "selectELANTemplateFile"
      );
      return;
    }

    //returns object with filePath and fileName
    const response = await window.pythonApi.getFile(false);

    if (response !== undefined) {
      data.additionalArguments.templateFile = response.filePath;
      setFileName([response.fileName]);
      setErrorState(false, "", "selectELANTemplateFile");
    }
  }

  function handleSecondsSelect(e) {
    data.additionalArguments.seconds = e.target.value;
    setData((data) => ({ ...data }));
  }

  function handleRemoveChip() {
    setFileName([]);
    data.additionalArguments.templateFile = "";
    setErrorState(false, "", "selectELANTemplateFile");
  }
  return (
    <div>
      <div className={styles.templateLabel}>
        <label>Select Template File</label>
      </div>
      <div className={styles.selectFile}>
        <button
          className={styles.btn}
          id="file-in-btn"
          onClick={() => handleSelectFile()}
        >
          Browse
        </button>
        <div className={styles.container}>
          <div
            className={styles.backgroundContainer}
            style={
              errors.selectELANTemplateFile.status === true
                ? { borderColor: "#c52f21" }
                : {}
            }
          >
            <div className={styles.chipsContainer}>
              {fileName.map((name) => (
                <Chip key={name} removeChip={() => handleRemoveChip()}>
                  {name}
                </Chip>
              ))}
            </div>
          </div>
          <Error customStyle={{ marginTop: ".3rem" }}>
            {errors.selectELANTemplateFile.message}
          </Error>
        </div>
      </div>

      <label>
        Select whether time offsets should be interpreted as seconds or
        milliseconds.
        <br />
        Set to "milliseconds" by default.
      </label>
      <select
        value={data.additionalArguments.seconds}
        onChange={(e) => handleSecondsSelect(e)}
      >
        <option defaultValue="false">Milliseconds</option>
        <option value="true">Seconds</option>
      </select>
    </div>
  );
}

export default ElanConfig;
