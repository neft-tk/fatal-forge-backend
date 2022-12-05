const auth = require('./handlers/authHandler');
// const chat = require('./handlers/lobby');
// const game = require('./handlers/game');

const CLIENT_URL = process.env.CLIENT_URL || 'https://localhost:3000';

const handler = (httpServer) =>{

    // Create the socket server using the httpServer, with cors options
    const io = require('socket.io')(httpServer, {
        cors: {
            origin: CLIENT_URL,
            methods: ['GET', 'POST']
        }
    });

    // This is where we can register our modular socket handlers
    io.on('connection', (socket)=>{
        auth(io, socket);
        // chat(io, socket);
        // game(io, socket);
        console.log(`client ${socket.id} connected`)
    })
}

module.exports = handler;