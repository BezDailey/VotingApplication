const sqlite3 = require("sqlite3").verbose();

// Connect to database
let db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database");
});

// Turn on foriegn keys
db.run("PRAGMA foreign_keys = ON;", (err) => {
  if (err) {
    console.error("Failed to enable foreign key support", err.message);
  }
});

// Create users table
db.run(
  `CREATE TABLE IF NOT EXISTS users (
  userID INTEGER PRIMARY KEY AUTOINCREMENT,
  userEmail TEXT NOT NULL UNIQUE,
  userPassword TEXT NOT NULL
)`,
  [],
  (err) => {
    if (err) {
      console.error("Error creating table", err.message);
    } else {
      console.log("users table created!");
    }
  },
);

// Create races table
db.run(
  `CREATE TABLE IF NOT EXISTS races(
  raceID INTEGER PRIMARY KEY AUTOINCREMENT,
  raceName TEXT NOT NULL,
  racePersonOne TEXT NOT NULL,
  racePersonOneParty TEXT NOT NULL,
  racePersonTwo TEXT,
  racePersonTwoParty TEXT,
  racePersonThree TEXT,
  racePersonThreeParty TEXT
)`,
  [],
  (err) => {
    if (err) {
      console.error("Error creating table", err.message);
    } else {
      console.log("races table created!");
    }
  },
);

// Create votes table
db.run(
  `CREATE TABLE IF NOT EXISTS votes(
voteID INTEGER PRIMARY KEY AUTOINCREMENT,
votePerson TEXT NOT NULL,
userID INTEGER NOT NULL,
raceID INTEGER NOT NULL,
FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE,
FOREIGN KEY (raceID) REFERENCES races(raceID) ON DELETE CASCADE
)`,
  [],
  (err) => {
    if (err) {
      console.error("Error creating table", err.message);
    } else {
      console.log("votes table created!");
    }
  },
);

// Create ballots table
db.run(`CREATE TABLE IF NOT EXISTS ballots(
  ballotID INTEGER PRIMARY KEY AUTOINCREMENT,
  ballotName TEXT NOT NULL,
  userID INTEGER NOT NULL,
  raceOneID INTEGER NOT NULL,
  raceTwoID INTEGER,
  raceThreeID INTEGER,
  FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE,
  FOREIGN KEY (raceOneID) REFERENCES races(raceID) ON DELETE CASCADE,
  FOREIGN KEY (raceTwoID) REFERENCES races(raceID) ON DELETE CASCADE,
  FOREIGN KEY (raceThreeID) REFERENCES races(raceID) ON DELETE CASCADE
)`);

// User data
const users = [
  { userEmail: "user1@example.com", userPassword: "password1" },
  { userEmail: "user2@example.com", userPassword: "password2" },
  { userEmail: "user3@example.com", userPassword: "password3" },
  { userEmail: "user4@example.com", userPassword: "password4" },
  { userEmail: "user5@example.com", userPassword: "password5" },
];

// Insert users into the database
users.forEach((user) => {
  db.run(
    `INSERT INTO users (userEmail, userPassword) VALUES (?, ?)`,
    [user.userEmail, user.userPassword],
    (err) => {
      if (err) {
        console.error("Error inserting user", err.message);
      } else {
        console.log("User inserted");
      }
    },
  );
});

// Close database connection
db.close((err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Closed the database connection");
  }
});
