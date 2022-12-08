const GameManager = require('../../game/GameManager')
const Player = require('../../game/Player')

module.exports = (io, socket) => {
    socket.on('game', (data)=>{

        switch (data.type){
            case "createGame":
                const newGame = GameManager.CreateGame(data.roomId);
                newGame.addPlayer(new Player(socket.id))
            break;

            case "joinRoom":
                
            break;

            case "playCard":

            break;
        }
        
    })

    socket.on('disconnect', (reason)=>{
        //users.removeUser(socket.id);
    })
}