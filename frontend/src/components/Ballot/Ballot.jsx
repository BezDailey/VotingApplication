import React from "react";
import axios from "axios";

import styles from "./Ballot.module.css";

import Race from "../Race/Race";

const Ballot = ({
  ballotID,
  ballotName,
  userID,
  raceOneID,
  raceTwoID,
  raceThreeID,
  user,
  deleteBallot,
  races,
  setVotes,
  ballot,
  votes,
}) => {
  const deleteRace = async (raceID) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/race/${raceID}`,
      );
      console.log(response.data.message);
    } catch (error) {
      console.error(
        "Error deleting race:",
        error.response?.data?.error || error.message,
      );
    }
  };

  const deleteBallotInDB = async (ballotID) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/ballot/${ballotID}`,
      );
      console.log(response.data.message);
    } catch (error) {
      console.error(
        "Error deleting ballot:",
        error.response?.data?.error || error.message,
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (raceOneID != null) {
      await deleteRace(raceOneID);
    }

    if (raceTwoID != null) {
      await deleteRace(raceTwoID);
    }

    if (raceThreeID != null) {
      await deleteRace(raceThreeID);
    }

    await deleteBallotInDB(ballotID);
    deleteBallot(ballotID);
  };

  const allowedIDs = [raceOneID, raceTwoID, raceThreeID].filter(Boolean);

  if (user) {
    return (
      <div className={styles.ballot}>
        <h1>{ballotName}</h1>
        {races.map((race) => {
          if (allowedIDs.includes(race.raceID)) {
            return (
              <Race
                setVotes={setVotes}
                votes={votes}
                user={user}
                race={race}
                key={race.raceID}
                ballot={ballot}
              />
            );
          }
          return null;
        })}
        {userID === Number(user.userID) && (
          <form onSubmit={handleSubmit}>
            <button type="submit">Delete</button>
          </form>
        )}
      </div>
    );
  }
};

export default Ballot;
