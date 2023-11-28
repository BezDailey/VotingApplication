import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./App.module.css";

import LoginBox from "./components/LoginBox/LoginBox";
import PollsBox from "./components/PollsBox/PollsBox";
import AccountCreation from "./components/AccountCreation/AccountCreation";
import BallotCreationBox from "./components/BallotCreationBox/BallotCreationBox";

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ userID: null });
  const [ballots, setBallots] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLogin] = useState(false);

  const deleteBallot = (ballotID) => {
    setBallots((prevBallots) =>
      prevBallots.filter((ballot) => ballot.ballotID !== ballotID),
    );
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        setUsers(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch users.");
      }
    };

    const fetchBallots = async () => {
      try {
        const response = await axios.get("http://localhost:3001/ballots");
        setBallots(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch ballots.");
        setLoading(false);
      }
    };

    fetchUsers();
    fetchBallots();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleLogout = (e) => {
    e.preventDefault();
    setUser([]);
    setLogin(false);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.nav}>
        <p>Voting Poll Application</p>
        {loggedIn && (
          <div className={styles.welcomeContainer}>
            <p>Welcome, {user.userEmail}</p>
            <form onSubmit={handleLogout}>
              <button type="submit">Logout</button>
            </form>
          </div>
        )}
        {!loggedIn && <p>Please Login</p>}
      </div>
      <div className={styles.componentContainer}>
        {!loggedIn && <LoginBox setUser={setUser} setLoggedIn={setLogin} />}
        {!loggedIn && <AccountCreation setUser={setUser} />}
        {loggedIn && (
          <PollsBox user={user} deleteBallot={deleteBallot} ballots={ballots} />
        )}
        {loggedIn && <BallotCreationBox setBallots={setBallots} user={user} />}
      </div>
    </div>
  );
}

export default App;
