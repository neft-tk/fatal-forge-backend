const GameManager = require('../../game/GameManager')
const Player = require('../../game/Player')

module.exports = (io, socket) => {
    socket.on('game', (data)=>{
        const game = GameManager.GetGame(data.gameId)
        switch (data.type){
            
            case "createGame":{
                const id = data.data;
                const newGame = GameManager.CreateGame(id);
                newGame.AddPlayer(Player(socket))
                socket.join(id)
                console.log(`socket ${socket.gameId} created game ${id}`)
            }
            break;

            case "joinGame":{
                const id = data.data;
                const findGame = GameManager.GetGame(id);
                if (findGame){
                    findGame.AddPlayer(Player(socket));
                    socket.join(id)
                    console.log(`socket ${socket.id} joined game ${id}`)
                }else{
                    console.log(`socket ${socket.id} tried joining a game that doesn't exist`)
                }
            }
            break;

            case "chooseColor":{
                game.GetSelf(socket).SetColor(data.data);
                io.to(game.id).emit("chooseColor", {
                    userId: game.GetSelf().userId,
                    color: data.data
                })
            }
            break;

            case "isReady":{
                game.GetSelf(socket).SetReady();
                io.to(game.id).emit("isReady", {
                    userId: game.GetSelf().userId
                })
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