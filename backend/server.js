const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use(bodyParser.json());

let db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Failed to open SQLite database");
  } else {
    console.log("Connected to SQLite database");
  }
});

app.get("/", (req, res) => {
  res.send("Ballot Application Server");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.all(sql, [], (err, users) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json(users);
    }
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  const sql = "SELECT * FROM users WHERE userEmail = ? AND userPassword = ?";
  db.get(sql, [username, password], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (user) {
      res.json({ message: "Login successful", user });
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  });
});

app.get("/ballots", (req, res) => {
  const sql = "SELECT * FROM ballots";
  db.all(sql, [], (err, ballots) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    } else {
      res.json(ballots);
    }
  });
});

app.post("/user", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  const sql = "INSERT INTO users (userEmail, userPassword) VALUES (?, ?)";

  db.run(sql, [username, password], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "User created successfully", id: this.lastID });
  });
});

app.post("/race", (req, res) => {
  const {
    raceName,
    racePersonOne,
    racePersonOneParty,
    racePersonTwo,
    racePersonTwoParty,
    racePersonThree,
    racePersonThreeParty,
  } = req.body;

  if (!raceName || !racePersonOne || !racePersonOneParty) {
    return res.status(400).json({ error: "Required fields are missing." });
  }

  const sql = `
    INSERT INTO races (
      raceName, 
      racePersonOne, racePersonOneParty, 
      racePersonTwo, racePersonTwoParty, 
      racePersonThree, racePersonThreeParty
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.run(
    sql,
    [
      raceName,
      racePersonOne,
      racePersonOneParty,
      racePersonTwo,
      racePersonTwoParty,
      racePersonThree,
      racePersonThreeParty,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Race entry created successfully", id: this.lastID });
    },
  );
});

app.post("/ballot", (req, res) => {
  const { ballotName, userID, raceOneID, raceTwoID, raceThreeID } = req.body;

  if (!ballotName || !userID || !raceOneID) {
    return res.status(400).json({ error: "Required fields are missing." });
  }

  const sql = `
    INSERT INTO ballots (
      ballotName, 
      userID, 
      raceOneID, 
      raceTwoID, 
      raceThreeID
    ) VALUES (?, ?, ?, ?, ?)`;

  db.run(
    sql,
    [ballotName, userID, raceOneID, raceTwoID, raceThreeID],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        message: "Ballot entry created successfully",
        id: this.lastID,
      });
    },
  );
});

app.delete("/race/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Race ID is required." });
  }

  const sql = "DELETE FROM races WHERE raceID = ?";

  db.run(sql, id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Race not found." });
    }
    res.json({ message: "Race deleted successfully" });
  });
});

app.delete("/ballot/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Ballot ID is required." });
  }

  const sql = "DELETE FROM ballots WHERE ballotID = ?";

  db.run(sql, id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Ballot not found." });
    }
    res.json({ message: "Ballot deleted successfully" });
  });
});
