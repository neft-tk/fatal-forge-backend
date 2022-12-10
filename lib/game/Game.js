const Player = require("./Player");

const Game = (gameId) =>{
    const id = gameId;
    const players = new Map();

    return {
        GetId(){
            return id;
        },
        AddPlayer(socket){
            if (!players.has(socket.userData.id)){
                players.set(socket.userData.id, Player(socket));
            }
        },
        GetPlayers(){
            return [...players.values()];
        },
        GetSelf(socket){
            return players.get(socket.userData.id)
        },
        GetOpponent(socket){
            return [...players.values()].find(x=>x.userData.id != socket.userData.id);
        },
        GetBothReady(){
            return [...players.values()].filter(x=>x.isReady).length == 2;
        },
        GetState(){
            return {
                id: id,
                players: this.GetPlayers()
            }
        }
    }
}

module.exports = Game;