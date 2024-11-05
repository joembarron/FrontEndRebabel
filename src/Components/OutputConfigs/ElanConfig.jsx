import React from "react";
import Error from "../Error.jsx";

function ElanConfig({data, errors, setErrorState}) {

    async function handleSelectFile() {
        //returns object with filePath and fileName
        const response = await window.pythonApi.getFile(false);
    
        
    }

    return (
        <div>
            <label>Select the template file</label>
            <button
                onClick={() => handleSelectFile()}
            >
                Browse
            </button>

        </div>
    );

}

export default ElanConfig;