import React from "react";
import Select from 'react-select';

function OutputFileConfig({ isOpen, onClose, data, setData }) {

  const flextextOptions = [
    { value : 'interlinear-text', label: 'interlinear-text' },
    { value : 'paragraph', label: 'paragraph' },
    { value : 'phrase', label: 'phrase' },
    { value : 'word', label: 'word' },
    { value : 'morph', label: 'morpheme' }
  ]

  return (
    <dialog open={isOpen} className="modal-overlay">
      <article>
        <h2>{data.outFileType} Configuration Settings</h2>
        <hr></hr>
        <section>
        {data.outFileType === "flextext" && 
           <>
            <div>
            <label>Select the highest level non-empty layer that will be used in the flextext file. Set to "phrase" by default.</label>
            <Select
              defaultValue={[flextextOptions[2]]}
              value={data.root ? flextextOptions.find(option => option.value === data.root) : null}
              maxMenuHeight={200}
              name="root"
              options={flextextOptions}
              className="basic-single"
              classNamePrefix="select"
              isSearchable={false}
              onChange={(choice) => setData((data) => ({ ...data, root: choice.value}))}
              aria-label="root settings"
            />

          </div>
          <div>
            <label>Select layers to skip, if any. Set to "morpheme" by default.</label>
            <Select
              defaultValue={[flextextOptions[4]]}
              value={data.skip.map(skipValue => flextextOptions.find(option => option.value === skipValue)).filter(Boolean)}
              maxMenuHeight={85}
              isMulti
              name="skip"
              options={flextextOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              isSearchable={false}
              onChange={(choices) => setData((data) => ({ ...data, skip: choices.map(choice => choice.value)}))}
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