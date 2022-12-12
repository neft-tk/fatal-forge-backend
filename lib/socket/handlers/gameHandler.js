const GameManager = require('../../game/GameManager')
const Player = require('../../game/Player')

module.exports = (io, socket) => {
    socket.on('game', (data)=>{
        const game = data.gameId ? GameManager.GetGame(data.gameId) : null;
        switch (data.type){
            
            case "createGame":{
                console.log(data);
                const id = data.data.id;
                const newGame = GameManager.CreateGame(id,data.data.size);
                newGame.AddPlayer(socket);
                socket.join(id)
                console.log(`socket ${socket.userData.username} created game ${id}`)
            }
            break;

            case "joinGame":{
                const id = data.data;
                const game = GameManager.GetGame(id);
                if (game){
                    if (game.GetPlayers().length == 2){
                        console.log(`socket ${socket.userData.username} tried joining a full game`)
                        return;
                    }
                    game.AddPlayer(socket);
                    socket.join(id)
                    console.log(`socket ${socket.userData.username} joined game ${id}`)
                    io.to(id).emit("game", {type:'playerUpdate', data:game.GetPlayers()})

                    const turn = game.GetState().turn;
                    console.log(`all players joined, rolled to start: ${turn}`)
                    io.to(id).emit('game', {type:'startTurn', data:turn})
                }else{
                    console.log(`socket ${socket.userData.username} tried joining a game that doesn't exist`)
                }
            }
            break;

            case "pickColor":{
                game.GetSelf(socket).color = data.data;
                console.log(`${socket.userData.username} picked a color: ${data.data}`)
                io.to(game.GetId()).emit('game', {type:"playerUpdate", data:game.GetPlayers()});
            }
            break;

            case "isReady":{
                const self = game.GetSelf(socket);
                self.isReady = true;
                console.log(`${socket.userData.username} pressed ready`)
                io.to(game.GetId()).emit('game', {type:"playerUpdate", data:game.GetPlayers()});
            }
            break;

            case "placeCard":{
                const {gridIndex, meta} = data.data;
                const color = game.GetSelf(socket).color;
                const card = {
                    name: meta.name,
                    compass: meta.compass,
                    faction: color,
                    imagePath: meta.imagePath
                }
                console.log(`${socket.userData.username} placed ${card.name} at grid index ${gridIndex}`)
                const changes = game.PlaceCard(card, gridIndex)
                io.to(game.GetId()).emit('game', {type:'placeCard', data:{card: card, index:gridIndex, changes: changes, state:game.GetState()}})
            }

            break;
        }
        
    })
    
}