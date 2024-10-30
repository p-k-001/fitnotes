const express = require('express');
const multer = require('multer');
const Papa = require('papaparse'); // For parsing CSV
const fs = require('fs');
const db = require('./db'); // Import SQLite DB
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Store uploaded files temporarily

// TODO: move to config:
const port = 3000;
const clientUrl = 'http://localhost:5173';

// Enable CORS
app.use(
  cors({
    origin: clientUrl,
    credentials: true, // Allows sending cookies if needed
  })
);

app.get('/', (req, res) => {
  res.send('Hi.');
});

// app.get('/upload', (req, res) => {
//   res.send('Hi');
// });

app.post('/upload', upload.single('file'), (req, res) => {
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

app.get('/workouts', (req, res) => {
  db.all('SELECT * FROM workouts', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching workouts' });
    }
    res.json(rows);
  });
});

app.delete('/deletedb', (req, res) => {
  db.run(`DELETE FROM workouts;`);
});

app.listen(port, () => {
  console.log(`LISTENING AT ${port}`);
});
