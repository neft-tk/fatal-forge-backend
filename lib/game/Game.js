const Game = (gameId) =>{
    const id = gameId;
    const players = [];

    return {
        GetId(){
            return id;
        },
        AddPlayer(player){
            players.push(player);
        }
    }
}

module.exports = Game;