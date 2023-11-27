import React, { useState } from "react";

import styles from "./Ballot.module.css";

import Race from "../Race/Race";

const Ballot = () => {
  return (
    <div className={styles.ballot}>
      <h1>Ballot Name</h1>
      <Race />
      <Race />
      <Race />
    </div>
  );
};

export default Ballot;
