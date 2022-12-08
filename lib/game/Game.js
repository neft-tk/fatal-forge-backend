const Game = (gameId) =>{
    const id = gameId;
    const players = [];

    return {
        GetId(){
            return id;
        },
        AddUser(player){
            users.push(player);
        }
    }
}

module.exports = Game;