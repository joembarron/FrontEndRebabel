import React from "react";
import styles from "./Errors.module.css";

function Error({ children, customStyle = {} }) {
  return (
    <small style={customStyle} className={styles.error}>
      {children}
    </small>
  );
}

export default Error;
