import React, { useState } from "react";
import axios from "axios";

import styles from "./BallotCreationBox.module.css";

const BallotCreationBox = ({ user, setBallots }) => {
  const [ballotName, setBallotName] = useState("");
  const [raceAmount, setRaceAmount] = useState("1");

  // Race one state.
  const [raceOneName, setRaceOneName] = useState("");
  const [raceOneAmount, setRaceOneAmount] = useState("2");
  const [raceOnePersonOneName, setRaceOnePersonOneName] = useState("");
  const [raceOnePersonOneParty, setRaceOnePersonOneParty] = useState("");
  const [raceOnePersonTwoName, setRaceOnePersonTwoName] = useState("");
  const [raceOnePersonTwoParty, setRaceOnePersonTwoParty] = useState("");
  const [raceOnePersonThreeName, setRaceOnePersonThreeName] = useState("");
  const [raceOnePersonThreeParty, setRaceOnePersonThreeParty] = useState("");

  // Race two state.
  const [raceTwoName, setRaceTwoName] = useState("");
  const [raceTwoAmount, setRaceTwoAmount] = useState("2");
  const [raceTwoPersonOneName, setRaceTwoPersonOneName] = useState("");
  const [raceTwoPersonOneParty, setRaceTwoPersonOneParty] = useState("");
  const [raceTwoPersonTwoName, setRaceTwoPersonTwoName] = useState("");
  const [raceTwoPersonTwoParty, setRaceTwoPersonTwoParty] = useState("");
  const [raceTwoPersonThreeName, setRaceTwoPersonThreeName] = useState("");
  const [raceTwoPersonThreeParty, setRaceTwoPersonThreeParty] = useState("");

  // Race three state.
  const [raceThreeName, setRaceThreeName] = useState("");
  const [raceThreeAmount, setRaceThreeAmount] = useState("2");
  const [raceThreePersonOneName, setRaceThreePersonOneName] = useState("");
  const [raceThreePersonOneParty, setRaceThreePersonOneParty] = useState("");
  const [raceThreePersonTwoName, setRaceThreePersonTwoName] = useState("");
  const [raceThreePersonTwoParty, setRaceThreePersonTwoParty] = useState("");
  const [raceThreePersonThreeName, setRaceThreePersonThreeName] = useState("");
  const [raceThreePersonThreeParty, setRaceThreePersonThreeParty] =
    useState("");

  const resetForm = () => {
    setBallotName("");
    setRaceAmount("1");

    // Race one inputs
    setRaceOneName("");
    setRaceOneAmount("2");
    setRaceOnePersonOneName("");
    setRaceOnePersonOneParty("");
    setRaceOnePersonTwoName("");
    setRaceOnePersonTwoParty("");
    setRaceOnePersonThreeName("");
    setRaceOnePersonThreeParty("");

    // Race two inputs
    setRaceTwoName("");
    setRaceTwoAmount("2");
    setRaceTwoPersonOneName("");
    setRaceTwoPersonOneParty("");
    setRaceTwoPersonTwoName("");
    setRaceTwoPersonTwoParty("");
    setRaceTwoPersonThreeName("");
    setRaceTwoPersonThreeParty("");

    // Race three inputs
    setRaceThreeName("");
    setRaceThreeAmount("2");
    setRaceThreePersonOneName("");
    setRaceThreePersonOneParty("");
    setRaceThreePersonTwoName("");
    setRaceThreePersonTwoParty("");
    setRaceThreePersonThreeName("");
    setRaceThreePersonThreeParty("");
  };

  const handleRaceChange = (e) => {
    setRaceAmount(e.target.value);
  };

  const handleRaceOneChange = (e) => {
    setRaceOneAmount(e.target.value);
  };

  const handleRaceTwoChange = (e) => {
    setRaceTwoAmount(e.target.value);
  };

  const handleRaceThreeChange = (e) => {
    setRaceThreeAmount(e.target.value);
  };

  const createRace = async (
    raceName,
    racePersonOne,
    racePersonOneParty,
    racePersonTwo,
    racePersonTwoParty,
    racePersonThree,
    racePersonThreeParty,
  ) => {
    if (!raceName || !racePersonOne || !racePersonOneParty) {
      alert(
        "The race must have a name and at least one person must be inputted",
      );
      return null;
    }

    try {
      const response = await axios.post("http://localhost:3001/race", {
        raceName,
        racePersonOne,
        racePersonOneParty,
        racePersonTwo,
        racePersonTwoParty,
        racePersonThree,
        racePersonThreeParty,
      });

      if (response.data.errors) {
        alert("Race creation failed: " + response.data.error);
        return null;
      } else {
        alert("Race creation successful");
        return response.data.id;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const createBallot = async (
    ballotName,
    userID,
    raceOneID,
    raceTwoID,
    raceThreeID,
  ) => {
    if (!ballotName || !userID || !raceOneID) {
      return null;
    }

    try {
      const response = await axios.post("http://localhost:3001/ballot", {
        ballotName,
        userID,
        raceOneID,
        raceTwoID,
        raceThreeID,
      });

      if (response.data.errors) {
        alert("Ballot creation failed: " + response.data.error);
        return null;
      } else {
        alert("Ballot creation successful");
        return response.data.id;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let raceOneID;
    let raceTwoID;
    let raceThreeID;

    switch (raceAmount) {
      case "1":
        raceOneID = await createRace(
          raceOneName,
          raceOnePersonOneName,
          raceOnePersonOneParty,
          raceOnePersonTwoName,
          raceOnePersonTwoParty,
          raceOnePersonThreeName,
          raceOnePersonThreeParty,
        );

        await createBallot(
          ballotName,
          user.userID,
          raceOneID,
          raceTwoID,
          raceThreeID,
        );

        console.log("Race One ID", raceOneID);

        break;
      case "2":
        raceOneID = await createRace(
          raceOneName,
          raceOnePersonOneName,
          raceOnePersonOneParty,
          raceOnePersonTwoName,
          raceOnePersonTwoParty,
          raceOnePersonThreeName,
          raceOnePersonThreeParty,
        );

        raceTwoID = await createRace(
          raceTwoName,
          raceTwoPersonOneName,
          raceTwoPersonOneParty,
          raceTwoPersonTwoName,
          raceTwoPersonTwoParty,
          raceTwoPersonThreeName,
          raceTwoPersonThreeParty,
        );

        await createBallot(
          ballotName,
          user.userID,
          raceOneID,
          raceTwoID,
          raceThreeID,
        );

        break;
      case "3":
        raceOneID = await createRace(
          raceOneName,
          raceOnePersonOneName,
          raceOnePersonOneParty,
          raceOnePersonTwoName,
          raceOnePersonTwoParty,
          raceOnePersonThreeName,
          raceOnePersonThreeParty,
        );

        raceTwoID = await createRace(
          raceTwoName,
          raceTwoPersonOneName,
          raceTwoPersonOneParty,
          raceTwoPersonTwoName,
          raceTwoPersonTwoParty,
          raceTwoPersonThreeName,
          raceTwoPersonThreeParty,
        );

        raceThreeID = await createRace(
          raceThreeName,
          raceThreePersonOneName,
          raceThreePersonOneParty,
          raceThreePersonTwoName,
          raceThreePersonTwoParty,
          raceThreePersonThreeName,
          raceThreePersonThreeParty,
        );

        await createBallot(
          ballotName,
          user.userID,
          raceOneID,
          raceTwoID,
          raceThreeID,
        );

        break;
      default:
    }

    const response = await axios.get("http://localhost:3001/ballots");
    setBallots(response.data);

    resetForm();
  };

  return (
    <div className={styles.container}>
      <h1>Create Ballot</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.ballotNameContainer}>
          <div className={styles.ballotNameInput}>
            <label>Ballot Name:</label>
            <input
              type="text"
              id="ballotName"
              value={ballotName}
              onChange={(e) => setBallotName(e.target.value)}
            />
          </div>
          <div>
            <label>Number of races:</label>
            <label>
              <input
                type="radio"
                value="1"
                checked={raceAmount === "1"}
                onChange={handleRaceChange}
              />
              1
            </label>
            <label>
              <input
                type="radio"
                value="2"
                checked={raceAmount === "2"}
                onChange={handleRaceChange}
              />
              2
            </label>
            <label>
              <input
                type="radio"
                value="3"
                checked={raceAmount === "3"}
                onChange={handleRaceChange}
              />
              3
            </label>
          </div>
        </div>
        {/*Race one start. */}
        <div className={styles.raceContainer}>
          <h2>Race Form</h2>
          <div>
            <label>Race Name:</label>
            <input
              type="text"
              id="raceOneName"
              value={raceOneName}
              onChange={(e) => setRaceOneName(e.target.value)}
            />
          </div>
          <div>
            <label>People in race</label>
            <label>
              <input
                type="radio"
                value="2"
                checked={raceOneAmount === "2"}
                onChange={handleRaceOneChange}
              />
              2
            </label>
            <label>
              <input
                type="radio"
                value="3"
                checked={raceOneAmount === "3"}
                onChange={handleRaceOneChange}
              />
              3
            </label>
          </div>
          <div>
            <label>Person One Name:</label>
            <input
              type="text"
              id="raceOnePersonOneName"
              value={raceOnePersonOneName}
              onChange={(e) => setRaceOnePersonOneName(e.target.value)}
            />
          </div>
          <div>
            <label>Person One Party:</label>
            <input
              type="text"
              id="raceOnePersonOneParty"
              value={raceOnePersonOneParty}
              onChange={(e) => setRaceOnePersonOneParty(e.target.value)}
            />
          </div>
          <div>
            <label>Person Two Name:</label>
            <input
              type="text"
              id="raceOnePersonTwoName"
              value={raceOnePersonTwoName}
              onChange={(e) => setRaceOnePersonTwoName(e.target.value)}
            />
          </div>
          <div>
            <label>Person Two Party:</label>
            <input
              type="text"
              id="raceOnePersonTwoParty"
              value={raceOnePersonTwoParty}
              onChange={(e) => setRaceOnePersonTwoParty(e.target.value)}
            />
          </div>
          {raceOneAmount === "3" && (
            <div>
              <div>
                <label>Person Three Name:</label>
                <input
                  type="text"
                  id="raceOnePersonThreeName"
                  value={raceOnePersonThreeName}
                  onChange={(e) => setRaceOnePersonThreeName(e.target.value)}
                />
              </div>
              <div>
                <label>Person Three Party:</label>
                <input
                  type="text"
                  id="raceOnePersonThreeParty"
                  value={raceOnePersonThreeParty}
                  onChange={(e) => setRaceOnePersonThreeParty(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
        {/*Race one end.*/}
        {/*Race two start. */}
        {raceAmount > 1 && (
          <div className={styles.raceContainer}>
            <h2>Race Form</h2>
            <div>
              <label>Race Name:</label>
              <input
                type="text"
                id="raceTwoName"
                value={raceTwoName}
                onChange={(e) => setRaceTwoName(e.target.value)}
              />
            </div>
            <div>
              <label>People in race</label>
              <label>
                <input
                  type="radio"
                  value="2"
                  checked={raceTwoAmount === "2"}
                  onChange={handleRaceTwoChange}
                />
                2
              </label>
              <label>
                <input
                  type="radio"
                  value="3"
                  checked={raceTwoAmount === "3"}
                  onChange={handleRaceTwoChange}
                />
                3
              </label>
            </div>
            <div>
              <label>Person One Name:</label>
              <input
                type="text"
                id="raceTwoPersonOneName"
                value={raceTwoPersonOneName}
                onChange={(e) => setRaceTwoPersonOneName(e.target.value)}
              />
            </div>
            <div>
              <label>Person One Party:</label>
              <input
                type="text"
                id="raceTwoPersonOneParty"
                value={raceTwoPersonOneParty}
                onChange={(e) => setRaceTwoPersonOneParty(e.target.value)}
              />
            </div>
            <div>
              <label>Person Two Name:</label>
              <input
                type="text"
                id="raceTwoPersonTwoName"
                value={raceTwoPersonTwoName}
                onChange={(e) => setRaceTwoPersonTwoName(e.target.value)}
              />
            </div>
            <div>
              <label>Person Two Party:</label>
              <input
                type="text"
                id="raceTwoPersonTwoParty"
                value={raceTwoPersonTwoParty}
                onChange={(e) => setRaceTwoPersonTwoParty(e.target.value)}
              />
            </div>
            {raceTwoAmount === "3" && (
              <div>
                <div>
                  <label>Person Three Name:</label>
                  <input
                    type="text"
                    id="raceTwoPersonThreeName"
                    value={raceTwoPersonThreeName}
                    onChange={(e) => setRaceTwoPersonThreeName(e.target.value)}
                  />
                </div>
                <div>
                  <label>Person Three Party:</label>
                  <input
                    type="text"
                    id="raceTwoPersonThreeParty"
                    value={raceTwoPersonThreeParty}
                    onChange={(e) => setRaceTwoPersonThreeParty(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        )}
        {/*Race two end.*/}
        {/*Race three start. */}
        {raceAmount > 2 && (
          <div className={styles.raceContainer}>
            <h2>Race Form</h2>
            <div>
              <label>Race Name:</label>
              <input
                type="text"
                id="raceThreeName"
                value={raceThreeName}
                onChange={(e) => setRaceThreeName(e.target.value)}
              />
            </div>
            <div>
              <label>People in race</label>
              <label>
                <input
                  type="radio"
                  value="2"
                  checked={raceThreeAmount === "2"}
                  onChange={handleRaceThreeChange}
                />
                2
              </label>
              <label>
                <input
                  type="radio"
                  value="3"
                  checked={raceThreeAmount === "3"}
                  onChange={handleRaceThreeChange}
                />
                3
              </label>
            </div>
            <div>
              <label>Person One Name:</label>
              <input
                type="text"
                id="raceThreePersonOneName"
                value={raceThreePersonOneName}
                onChange={(e) => setRaceThreePersonOneName(e.target.value)}
              />
            </div>
            <div>
              <label>Person One Party:</label>
              <input
                type="text"
                id="raceThreePersonOneParty"
                value={raceThreePersonOneParty}
                onChange={(e) => setRaceThreePersonOneParty(e.target.value)}
              />
            </div>
            <div>
              <label>Person Two Name:</label>
              <input
                type="text"
                id="raceThreePersonTwoName"
                value={raceThreePersonTwoName}
                onChange={(e) => setRaceThreePersonTwoName(e.target.value)}
              />
            </div>
            <div>
              <label>Person Two Party:</label>
              <input
                type="text"
                id="raceThreePersonTwoParty"
                value={raceThreePersonTwoParty}
                onChange={(e) => setRaceThreePersonTwoParty(e.target.value)}
              />
            </div>
            {raceThreeAmount === "3" && (
              <div>
                <div>
                  <label>Person Three Name:</label>
                  <input
                    type="text"
                    id="raceThreePersonThreeName"
                    value={raceThreePersonThreeName}
                    onChange={(e) =>
                      setRaceThreePersonThreeName(e.target.value)
                    }
                  />
                </div>
                <div>
                  <label>Person Three Party:</label>
                  <input
                    type="text"
                    id="raceThreePersonThreeParty"
                    value={raceThreePersonThreeParty}
                    onChange={(e) =>
                      setRaceThreePersonThreeParty(e.target.value)
                    }
                  />
                </div>
              </div>
            )}
          </div>
        )}
        {/*Race three end.*/}
        <button type="submit">Create Ballot</button>
      </form>
    </div>
  );
};

export default BallotCreationBox;
