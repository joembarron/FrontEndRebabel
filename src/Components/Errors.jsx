import React from "react";
import styles from "./Errors.module.css";

function Error({ children }) {
  return <small className={styles.erro}>{children}</small>;
}

export default Error;
