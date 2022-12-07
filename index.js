const express = require('express');
const sequelize = require('./config/connection');
const http = require('http');
const cors = require('cors');
const allRoutes = require('./controllers');

const PORT = process.env.PORT || 3001;

const app = express();

// We need access to http server to use socket. 
const httpServer = http.createServer(app); 

// Use cors for cross origin requests
app.use(cors());

// Setup socket.io using our custom handler with the http server
require('./lib/socket')(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uses the ./controllers/index.js file for further routing
app.use('/', allRoutes);

sequelize.sync({ force: false }).then(() => {
  // We need our http server to listen since express isn't creating it's own.
  httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});