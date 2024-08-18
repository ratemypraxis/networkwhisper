const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to set CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Serve static files or handle other routes
app.use(express.static(path.join(__dirname, 'public')));

app.get('/favicon.ico', (req, res) => {
  res.status(204).send(); 
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
