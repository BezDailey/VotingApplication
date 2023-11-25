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
