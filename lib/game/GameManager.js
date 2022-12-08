const Game = require('./Game')

const gameManager = ()=>{
    const games = new Map();

    return {
        CreateGame(id){
            const game = new Game(id);
            games.set(id, game);
            return game;
        }
    }
}

const GameManager = gameManager();

module.exports = GameManager;