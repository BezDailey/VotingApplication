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

app.get("/race/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Race ID is required." });
  }

  const sql = "SELECT * FROM races WHERE raceID = ?";

  db.get(sql, id, (err, race) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json(race);
    }
  });
});

app.get("/races", (req, res) => {
  const sql = "SELECT * FROM races";

  db.all(sql, [], (err, races) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json(races);
    }
  });
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

/*
 * Vote table crud methods
 */

// Create a new vote
app.post("/votes", (req, res) => {
  const { votePerson, userID, raceID } = req.body;

  db.run(
    "INSERT INTO votes (votePerson, userID, raceID) VALUES (?, ?, ?)",
    [votePerson, userID, raceID],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        voteID: this.lastID,
        votePerson,
        userID,
        raceID,
      });
    },
  );
});

// Read all votes
app.get("/votes", (req, res) => {
  db.all("SELECT * FROM votes", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
});

// Read a specific vote by voteID
app.get("/votes/:voteID", (req, res) => {
  const { voteID } = req.params;

  db.get("SELECT * FROM votes WHERE voteID = ?", [voteID], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      return res.status(404).json({ message: "Vote not found" });
    }

    res.json(row);
  });
});

// Update a vote by voteID
app.put("/votes/:voteID", (req, res) => {
  const { votePerson, userID, raceID } = req.body;
  const { voteID } = req.params;

  db.run(
    "UPDATE votes SET votePerson = ?, userID = ?, raceID = ? WHERE voteID = ?",
    [votePerson, userID, raceID, voteID],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: "Vote not found" });
      }

      res.json({ message: "Vote updated" });
    },
  );
});

// Delete a vote by voteID
app.delete("/votes/:voteID", (req, res) => {
  const { voteID } = req.params;

  db.run("DELETE FROM votes WHERE voteID = ?", [voteID], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: "Vote not found" });
    }

    res.json({ message: "Vote deleted" });
  });
});
