const express = require('express');
const cors = require('cors');
const workouts = require('./routes/workouts');
const app = express();

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

app.use('/workouts', workouts);

app.listen(port, () => {
  console.log(`LISTENING AT ${port}`);
});
