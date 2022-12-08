const GameManager = require('../../game/GameManager')
const Player = require('../../game/Player')

module.exports = (io, socket) => {
    socket.on('game', (data)=>{

        switch (data.type){
            case "createGame":
                const newGame = GameManager.CreateGame(data.data);
                newGame.AddPlayer(Player(socket))
                console.log(`socket ${socket.id} created game ${data.data}`)
            break;

            case "joinGame":
                const game = GameManager.GetGame(data.data);
                if (game){
                    game.AddPlayer(Player(socket));
                    console.log(`socket ${socket.id} joined game ${data.data}`)
                }else{
                    console.log(`socket ${socket.id} tried joining a game that doesn't exist`)
                }

            break;

            case "playCard":

            break;
        }
        
    })

    socket.on('disconnect', (reason)=>{
        //users.removeUser(socket.id);
    })
}