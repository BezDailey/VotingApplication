import React, { useState } from "react";
import axios from "axios";

import styles from "./Race.module.css";
import RaceVotes from "../RaceVotes/RaceVotes";

const Race = ({ setVotes, race, user, ballot, votes }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const didVote = () => {
    console.log("didVote", votes);
    return votes.some((vote) => {
      return vote.raceID === race.raceID && vote.userID === user.userID;
    });
  };

  if (didVote()) {
    return <RaceVotes race={race} votes={votes} />;
  }

  const createVote = async (votePerson, userID, raceID) => {
    if (!votePerson || !userID || !raceID) {
      return null;
    }

    try {
      const response = await axios.post("http://localhost:3001/votes", {
        votePerson,
        userID,
        raceID,
      });

      if (response.data.errors) {
        alert("Vote operation failed: " + response.data.error);
        return null;
      } else {
        alert("Vote operation successful");
        return response.data.id;
      }
    } catch (error) {
      console.log("Error:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    createVote(selectedOption, user.userID, race.raceID);

    const voteResponse = await axios.get("http://localhost:3001/votes");
    setVotes(voteResponse.data);
  };

  if (user.userID !== ballot.userID) {
    return (
      <div className={styles.race}>
        <h2>{race.raceName}</h2>
        <form onSubmit={handleSubmit} className={styles.raceForm}>
          <div>
            <label>
              <input
                type="radio"
                value="Option1"
                checked={selectedOption === "Option1"}
                onChange={handleChange}
              />
              {race.racePersonOne} : {race.racePersonOneParty}
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="Option2"
                checked={selectedOption === "Option2"}
                onChange={handleChange}
              />
              {race.racePersonTwo} : {race.racePersonTwoParty}
            </label>
          </div>
          {race.racePersonThree !== "" && (
            <div>
              <label>
                <input
                  type="radio"
                  value="Option3"
                  checked={selectedOption === "Option3"}
                  onChange={handleChange}
                />
                {race.racePersonThree} : {race.racePersonThreeParty}
              </label>
            </div>
          )}
          <button type="sumbit">Vote</button>
        </form>
      </div>
    );
  } else {
    return <RaceVotes race={race} votes={votes} />;
  }
};

export default Race;
