import React from "react";
import styles from "./Chip.module.css";

function Chip({ children }) {
  return (
    <div className={styles.chip}>
      <span className={styles.text}>{children}</span>
    </div>
  );
}

export default Chip;
