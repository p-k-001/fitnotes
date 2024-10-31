const express = require('express');
const router = express.Router();
const multer = require('multer');
const Papa = require('papaparse'); // For parsing CSV
const fs = require('fs');
const db = require('../db'); // Import SQLite DB
const upload = multer({ dest: './uploads' }); // Store uploaded files temporarily

const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now());
  next();
};
router.use(timeLog);

router.get('/', (req, res) => {
  db.all('SELECT * FROM workouts', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching workouts' });
    }
    res.json(rows);
  });
});

router.post('/upload', upload.single('file'), (req, res) => {
  console.log('req.body:', req.body);
  console.log('req.file:', req.file);

  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Read the uploaded CSV file
  fs.readFile(file.path, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading file' });
    }

    // Parse the CSV data
    Papa.parse(data, {
      header: true,
      complete: (result) => {
        const workouts = result.data;
        // console.log(workouts);

        // Insert data into SQLite
        workouts.forEach((workout) => {
          console.log(workout);
          const {
            Date: date,
            Exercise: exercise,
            Category: category,
            Weight: weight,
            'Weight Unit': weight_unit,
            Reps: reps,
            Distance: distance,
            'Distance Unit': distance_unit,
            Time: time,
          } = workout;

          db.run(
            `
                          INSERT INTO workouts (date, exercise, category, weight, weight_unit, reps, distance, distance_unit, time)
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              date,
              exercise,
              category,
              weight,
              weight_unit,
              reps,
              distance,
              distance_unit,
              time,
            ]
          );
        });

        res.json({ message: 'File uploaded and data stored' });
      },
    });
    // console.log('🚀 ~ fs.readFile ~ data:', data);
  });
});

router.delete('/deletedb', (req, res) => {
  db.run(`DELETE FROM workouts;`, [], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to delete workouts' });
    }
    res.json({ message: 'All workouts deleted successfully' });
  });
});

module.exports = router;
