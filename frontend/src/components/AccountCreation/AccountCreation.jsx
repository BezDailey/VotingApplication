import React, { useState } from "react";

import styles from "./AccountCreation.module.css";

const AccountCreation = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creating account with", username, password);
    var validator = require("email-validator");
    if (validator.validate(username)) {
    } else {
      setError("Username must be an email");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create Account Here</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div>
          <label htmlfor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlfor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Create Account</button>
        {error !== "" && (
          <div className={styles.errorContainer}>
            <p>{error}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default AccountCreation;
