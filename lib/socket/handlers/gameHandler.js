const GameManager = require('../../game/GameManager')
const Player = require('../../game/Player')

module.exports = (io, socket) => {
    socket.on('game', (data)=>{

        switch (data.type){
            case "createGame":
                const newGame = GameManager.CreateGame(data.roomId);
                newGame.addPlayer(new Player(socket.id))
                console.log(`socket ${socket.id} created room ${data.data}`)
            break;

            case "joinRoom":
                const game = GameManager.GetGame(data.data);
                game.addPlayer(new Player(socket.id));
                console.log(`socket ${socket.id} joined room ${data.data}`)

            break;

            case "playCard":

            break;
        }
        
    })

    socket.on('disconnect', (reason)=>{
        //users.removeUser(socket.id);
    })
}