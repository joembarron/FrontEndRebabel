import React from "react";
import styles from "./MappingsTable.module.css";
import { TiDelete } from "react-icons/ti";

function MappingsTable({ mode, handleRemoveMapping, mappingData }) {
  let mappingIndex = mode === "type" ? 0 : 1;
  return (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            <th scope="col" className={styles.cell}>
              {mode === "type" ? "In Type" : "In Feature"}
            </th>
            <th scope="col" className={styles.cell}>
              {mode === "type" ? "Out Type" : "Out Feature"}
            </th>
            <th scope="col" className={styles.cell}>
              Remove
            </th>
          </tr>
        </thead>
        <tbody>
          {mappingData.map((pair, index) => (
            <tr>
              <td className={`${styles.cell} ${styles.first}`}>
                {mode === "type" ? pair.in_type : pair.in_feature}
              </td>
              <td className={`${styles.cell} ${styles.second}`}>
                {mode === "type" ? pair.out_type : pair.out_feature}
              </td>
              <td className={`${styles.cell} ${styles.third}`}>
                <TiDelete
                  className={styles.removeButton}
                  onClick={() => handleRemoveMapping(mappingIndex, index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MappingsTable;
