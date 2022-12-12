const Game = require('./Game');

const gameManager = ()=>{
    const games = new Map();

    return {
        CreateGame(id,size = 3){
            const game = Game(id, size);
            games.set(id, game);
            return game;
        },
        GetGame(id){
            return games.get(id);
        },
        Destroy(id){
            games.delete(id);
        },
        GetAllGames(){
            return [...games.values()].map(x=> {return x.GetState()});
        }
    }
}

const GameManager = gameManager();

module.exports = GameManager;