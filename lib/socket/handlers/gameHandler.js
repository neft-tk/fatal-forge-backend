const GameManager = require('../../game/GameManager')
const Player = require('../../game/Player')

module.exports = (io, socket) => {
    socket.on('createGame', (data)=>{
        const newGame = GameManager.CreateGame(data);
        newGame.addPlayer(new Player(socket.id))
    })

    socket.on('disconnect', (reason)=>{
        //users.removeUser(socket.id);
    })
}