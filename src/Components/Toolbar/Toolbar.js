import React from "react";
import styles from "./Toolbar.module.css";

const toolbar = props => (
  <div className={styles.Toolbar}>
    <h2 className={styles.Heading}>
      <a href="/" className={styles.a}>
        TweetAnalysis
      </a>
    </h2>
  </div>
);

export default toolbar;
