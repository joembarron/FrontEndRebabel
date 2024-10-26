import React, { useState } from "react";
import Mappings from "./Mappings.jsx";
import NLPConfig from "./NLPConfig.jsx";
import Convert from "./Convert.jsx";
import SelectFiles from "./SelectFiles.jsx";
import OutputFileConfig from "./OutputFileConfig.jsx";
import errorStates from "../ErrorStates.js";

const initialState = {
  filePath: [],
  fileName: [],
  inFileType: "",
  outFileType: "",
  delimiter: "/",
  nlpFileType: "",
  partOfSpeechFile: "",
  languageFile: "",
  mappings: [
    { in_type: "", out_type: "" },
    { in_feature: "", out_feature: "" },
  ],
  root: "phrase",
  skip: ["morph"],
};

function App() {
  //Sets state for file conversion
  const [data, setData] = useState(initialState);
  //Sets state for errors
  const [errors, setErrors] = useState(errorStates);
  //Set state for modals
  const [isMappingsOpen, setMappingsOpen] = useState(false);
  const [isNLPConfigOpen, setNLPConfigOpen] = useState(false);
  const [isOutputFileConfigOpen, setOutputFileConfigOpen] = useState(false);
  //Sets loading status for file conversion
  const [isLoading, setIsLoading] = useState(false);
  //Sets the values for the current included layers in the flextext settings
  const [includedLayerValues, setIncludedLayerValues] = useState(["phrase", "word"]);


  function setErrorState(errorStatus, errorMessage, propName) {
    setErrors((errors) => ({
      ...errors,
      [propName]: {
        status: errorStatus,
        message: errorMessage,
        ariaProps: { "aria-invalid": errorStatus },
      },
    }));
  }

  function handleSelectType(e) {
    if (e.target.name === "inputType") {
      setData((data) => ({ ...data, inFileType: e.target.value }));

      if (e.target.value === "nlp_pos") {
        setNLPConfigOpen(() => !isNLPConfigOpen);
      }
    } else if (e.target.name === "outputType") {
      setData((data) => ({ ...data, outFileType: e.target.value }));
    }
  }

  return (
    <div className="container flex-base">
      <header>
        <h2>reBabel</h2>
      </header>

      <section className="input-fields">
        <SelectFiles
          data={data}
          setData={setData}
          isLoading={isLoading}
          errors={errors}
          setErrorState={setErrorState}
        />
        <div className="file-type">
          <label>File input type</label>
          <select
            aria-label="Select File Type"
            name="inputType"
            onChange={(e) => handleSelectType(e)}
            disabled={isLoading}
          >
            <option defaultValue=""></option>
            <option value="flextext">Flextext</option>
            <option value="conllu">Conllu</option>
            <option value="nlp_pos">NLP</option>
          </select>
          {data.inFileType === "nlp_pos" && (
            <button
              className="nlp-button"
              disabled={isLoading}
              onClick={() => setNLPConfigOpen(!isNLPConfigOpen)}
            >
              NLP Settings
            </button>
          )}
        </div>
        <div className="file-type">
          <label>File output type</label>
          <select
            aria-label="Select File Type"
            name="outputType"
            onChange={(e) => handleSelectType(e)}
            disabled={isLoading}
          >
            <option defaultValue=""></option>
            <option value="flextext">Flextext</option>
          </select>
          {data.outFileType === "flextext" && (
            <button
              className="output-button"
              disabled={isLoading}
              onClick={() => setOutputFileConfigOpen(true)}
            >
              Output File Settings
            </button>
          )}
        </div>
        <div className="settings-container">
          <button onClick={() => setMappingsOpen(true)} disabled={isLoading}>
            Mappings
          </button>
        </div>
        <Convert
          data={data}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setErrorState={setErrorState}
        />
      </section>
      {/* Dialog component */}
      {isMappingsOpen && (
        <Mappings
          isOpen={isMappingsOpen}
          onClose={() => setMappingsOpen(!isMappingsOpen)}
          data={data}
          setData={setData}
        />
      )}
      {isNLPConfigOpen && (
        <NLPConfig
          isOpen={isNLPConfigOpen}
          onClose={() => setNLPConfigOpen(!isNLPConfigOpen)}
          data={data}
          setData={setData}
        />
      )}
      {isOutputFileConfigOpen && (
        <OutputFileConfig
          isOpen={isOutputFileConfigOpen}
          onClose={() => setOutputFileConfigOpen(!isOutputFileConfigOpen)}
          data={data}
          setData={setData}
          includedLayerValues={includedLayerValues}
          setIncludedLayerValues={setIncludedLayerValues}
        />
      )}
    </div>
  );
}

export default App;
