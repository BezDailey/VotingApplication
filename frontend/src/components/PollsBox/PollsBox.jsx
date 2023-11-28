import React from "react";

import styles from "./PollsBox.module.css";

import Ballot from "../Ballot/Ballot";

const PollsBox = ({ ballots, user, deleteBallot }) => {
  console.log(ballots);
  return (
    <div className={styles.container}>
      <h1>Ballots</h1>
      <div className={styles.ballotsContainer}>
        <Ballot />
        {ballots.map((ballot) => (
          <Ballot
            key={ballot.ballotID}
            deleteBallot={deleteBallot}
            user={user}
            {...ballot}
          />
        ))}
      </div>
    </div>
  );
};

export default PollsBox;
