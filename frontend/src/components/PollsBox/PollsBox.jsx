import React from "react";

import styles from "./PollsBox.module.css";

import Ballot from "../Ballot/Ballot";

const PollsBox = ({ votes, setVotes, races, ballots, user, deleteBallot }) => {
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
            races={races}
            setVotes={setVotes}
            ballot={ballot}
            votes={votes}
            {...ballot}
          />
        ))}
      </div>
    </div>
  );
};

export default PollsBox;
