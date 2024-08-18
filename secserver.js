const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const app = express();
const port = 443; 

const privateKey = fs.readFileSync('/etc/letsencrypt/live/listen.2nd.systems/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/listen.2nd.systems/fullchain.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

app.use(express.static(path.join(__dirname, 'public')));

app.get('/favicon.ico', (req, res) => {
  res.status(204).send(); 
});

https.createServer(credentials, app).listen(port, () => {
  console.log(`HTTPS Server running at https://listen.2nd.systems:${port}`);
});
