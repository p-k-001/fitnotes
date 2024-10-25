const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite database
const db = new sqlite3.Database(path.join(__dirname, 'workouts.db'), (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create table if not exists
db.run(`
    CREATE TABLE IF NOT EXISTS workouts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        exercise TEXT,
        category TEXT,
        weight REAL,
        weight_unit TEXT,
        reps INTEGER,
        distance REAL,
        distance_unit TEXT,
        time TEXT
    )
`);

module.exports = db;
