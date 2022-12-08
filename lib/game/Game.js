const Game = (gameId) =>{
    const id = gameId;
    const players = [];

    return {
        GetId(){
            return id;
        },
        AddPlayer(player){
            players.push(player);
        },
        GetSelf(socket){
            return players.find(x=> x.socketId == socket.id)
        },
        GetOpponent(socket){
            return players.find(x=> x.socketId != socket.id)
        },
        GetBothReady(){
            return players.filter(x=>x.isReady).length == 2;
        }
    }
}

module.exports = Game;