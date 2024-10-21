import React from "react";
import styles from "./Chip.module.css";
import { TiDelete } from "react-icons/ti";

function Chip({ data, setData, children }) {
  function removeChip(nameOfChip) {
    //create copies of Paths for removal
    let pathCopies = [...data.filePath];

    let newFileName = data.fileName.filter((fileName, index) => {
      if (fileName !== nameOfChip) {
        return true;
      } else {
        //remove path from copies
        pathCopies.splice(index, 1);
        return false;
      }
    });

    setData((data) => ({
      ...data,
      filePath: [...pathCopies],
      fileName: [...newFileName],
    }));
  }
  return (
    <div className={styles.chip}>
      <span className={styles.text}>{children}</span>
      <TiDelete
        className={styles.deleteIcon}
        onClick={() => removeChip(children)}
      />
    </div>
  );
}

export default Chip;
