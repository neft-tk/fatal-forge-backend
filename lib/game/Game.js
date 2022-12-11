const Player = require("./Player");
//const GameManager = require('./GameManager')

const Game = (gameId) =>{
    const id = gameId;
    const players = new Map();

    return {
        GetId(){
            return id;
        },
        AddPlayer(socket){
            if (!players.has(socket.userData.id)){
                if (socket.gameId){
                    //todo: need to disconnect player from existing game
                }
                const player = Player(socket);
                player.isConnected = true;
                players.set(socket.userData.id, Player(socket));
                socket.gameId = id;
            }
        },
        ConnectPlayer(socket){
            this.GetSelf(socket).isConnected = true;
        },
        DisconnectPlayer(socket){
            console.log('disconnecting', socket)
            const self = players.get(socket.userData.id);
            if (self){
                self.isConnected = false;
            }
            if ([...players.values()].filter(x=>x.isConnected).length == 0){
                require('./GameManager').Destroy(id);
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