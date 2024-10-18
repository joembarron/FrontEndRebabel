import React from "react";

function SelectFiles({ data, isLoading, setData }) {
  async function handleSelectFile() {
    //returns object with filePath and fileName
    const response = await window.pythonApi.getFile();

    if (response !== undefined) {
      setData((data) => ({
        ...data,
        fileName: response.fileName,
        filePath: response.filePath,
      }));
    }
  }
  return (
    <div className="select-file">
      <input
        id="file-in"
        readOnly="readonly"
        placeholder="Select File..."
        value={data.fileName.join(", ")}
        disabled={isLoading}
      />
      <button
        data-tooltip="Hold Ctrl to Select Multiple Files"
        id="file-in-btn"
        onClick={() => handleSelectFile()}
        disabled={isLoading}
      >
        Browse
      </button>
    </div>
  );
}

export default SelectFiles;
