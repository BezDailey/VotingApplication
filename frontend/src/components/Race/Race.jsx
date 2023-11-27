import React, { useState } from "react";

import styles from "./Race.module.css";

const Race = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected option:", selectedOption);
  };

  return (
    <div className={styles.race}>
      <h2>Race Name</h2>
      <form onSubmit={handleSubmit} className={styles.raceForm}>
        <div>
          <label>
            <input
              type="radio"
              value="Option1"
              checked={selectedOption === "Option1"}
              onChange={handleChange}
            />
            Person Name : Person Party
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
            Person Name : Person Party
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="Option3"
              checked={selectedOption === "Option3"}
              onChange={handleChange}
            />
            Person Name : Person Party
          </label>
        </div>
        <button type="sumbit">Submit</button>
      </form>
    </div>
  );
};

export default Race;
