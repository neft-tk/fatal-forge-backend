const express = require('express');
const router = require('express').Router();
const sequelize = require('./config/connection');

// TODO: Jon's route way.
const routes = require('./routes');
const http = require('http');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();

// We need access to http server to use socket. 
const httpServer = http.createServer(app); 

// Use cors for cross origin requests
app.use(cors());

// Setup socket.io using our custom handler with the http server
const io = require('./lib/socket')(httpServer);
app.set('socketio', io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Jon's route way.
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  // We need our http server to listen since express isn't creating it's own.
  httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});

async function checkGuestAccounts() {
  const res = await fetch('api/users/', {
    method: 'GET',
    headers: {
      'Content-Type': 'Application/json',
    },
  })
  return await res.json()
}

setTimeout(checkGuestAccounts, 7200000)