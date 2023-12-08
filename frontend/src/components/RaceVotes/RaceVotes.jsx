import React from "react";

const RaceVotes = ({ race, votes }) => {
  const voteCountMap = new Map();

  ["Option1", "Option2", "Option3"].forEach((person) => {
    voteCountMap.set(person, 0);
  });

  votes.forEach((vote) => {
    if (vote.raceID === race.raceID) {
      switch (vote.votePerson) {
        case "Option1":
          voteCountMap.set("Option1", voteCountMap.get("Option1") + 1);
          break;
        case "Option2":
          voteCountMap.set("Option2", voteCountMap.get("Option2") + 1);
          break;
        case "Option3":
          voteCountMap.set("Option3", voteCountMap.get("Option3") + 1);
          break;
        default:
          break;
      }
    }
  });

  return (
    <div>
      <h1>{race.raceName} Votes</h1>
      <div>
        <p>
          {race.racePersonOne} :{voteCountMap.get("Option1")}
        </p>
        <p>
          {race.racePersonTwo} :{voteCountMap.get("Option2")}
        </p>
        {race.racePersonThree !== "" && (
          <p>
            {race.racePersonThree} :{voteCountMap.get("Option3")}
          </p>
        )}
      </div>
    </div>
  );
};

export default RaceVotes;
