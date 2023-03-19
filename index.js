const express = require('express');
const sequelize = require('./config/connection');
const { User } = require('./models')
const { Op } = require('sequelize');

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

const deleteUsersWithEmailContainingStringOlderThanTwoHours = async function(str) {
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

  const usersToDelete = await User.findAll({
    where: {
      email: {
        [Op.like]: `%${str}%`
      },
      createdAt: {
        [Op.lt]: twoHoursAgo
      }
    }
  });
  console.log(usersToDelete)

  await Promise.all(usersToDelete.map(user => user.destroy()));
}


// Define the function to run every 1 hour
const deleteUsersTask = () => {
  deleteUsersWithEmailContainingStringOlderThanTwoHours('@gridlocke.guest')
    .then(() => {
      console.log('Deleted old users with email containing "@gridlocke.guest"');
    })
    .catch((error) => {
      console.error('Error deleting old users:', error);
    });
};

// Set up the interval to run the function every hour
const interval = 1 * 60 * 60 * 1000; // 1 hour in milliseconds
setInterval(deleteUsersTask, interval);