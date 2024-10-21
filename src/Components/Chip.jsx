import React from "react";
import styles from "./Chip.module.css";
import { TiDelete } from "react-icons/ti";

function Chip({ children }) {
  return (
    <div className={styles.chip}>
      <span className={styles.text}>{children}</span>
      <TiDelete className={styles.deleteIcon} />
    </div>
  );
}

export default Chip;
