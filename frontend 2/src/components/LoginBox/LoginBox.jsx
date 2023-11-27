import React, { useState } from "react";
import axios from "axios";

import styles from "./LoginBox.module.css";

const LoginBox = ({ setUser, setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with", username, password);

    axios
      .post("http://localhost:3001/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        console.log(response);

        if (response.data.errors) {
          alert("Login failed: " + response.data.error);
        } else {
          alert("Login successful");
          setUser(response.data.user);
          setLoggedIn(true);
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  };

  return (
    <div className={styles.container}>
      <h1>Login Here</h1>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginBox;
