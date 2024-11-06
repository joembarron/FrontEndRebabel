import React from "react";
import Error from "../Error.jsx";

function ElanConfig({
    data, 
    setData, 
    errors, 
    setErrorState, 
    isELANTemplateFileSelected, 
    setELANTemplateFileSelected
}) {

    async function handleSelectFile() {
        //returns object with filePath and fileName
        const response = await window.pythonApi.getFile(false);

        if (response !== undefined) {
            data.additionalArguments.templateFile = response.filePath;
            setErrorState(false, "", "selectELANTemplateFile");
            if (!isELANTemplateFileSelected) {
                setELANTemplateFileSelected(true);
            }
        }  
    }

    function handleSecondsSelect(e) {
        data.additionalArguments.seconds = e.target.value;
        setData((data) => ({ ...data}));
    }

    return (
        <div>
            <div className="template-file-container">
                <label className="template-label">
                    Select the template file:
                </label>
                <button className="template-button"
                    onClick={() => handleSelectFile()}
                >
                    {isELANTemplateFileSelected? "Replace File" : "Browse"}
                </button>
            </div>
            <label>
                Select whether time offsets should be interpreted as seconds or milliseconds.
                <br />Set to "milliseconds" by default.
            </label>
            <select 
                className="elan-select"
                value={data.additionalArguments.seconds}
                onChange={(e) => handleSecondsSelect(e)}
            >
                <option defaultValue="false">Milliseconds</option>
                <option value="true">Seconds</option>
            </select>
            <Error>{errors.selectELANTemplateFile.message}</Error>
        </div>
    );

}

export default ElanConfig;