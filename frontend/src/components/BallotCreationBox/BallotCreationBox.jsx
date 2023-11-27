import React, { useState } from "react";

import styles from "./BallotCreationBox.module.css";

const BallotCreationBox = () => {
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

  return (
    <div className={styles.container}>
      <h1>Create Ballot</h1>
      <form>
        <div>
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
      </form>
    </div>
  );
};

export default BallotCreationBox;
