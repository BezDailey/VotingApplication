import React from "react";

import styles from "./PollsBox.module.css";

import Ballot from "../Ballot/Ballot";

const PollsBox = ({ ballots }) => {
  return (
    <div className={styles.container}>
      <h1>Ballots</h1>
      <div className={styles.ballotsContainer}>
        <Ballot />
      </div>
    </div>
  );
};

export default PollsBox;
