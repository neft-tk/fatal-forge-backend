const GameManager = require('../lib/game/GameManager');
const UserManager = require('../lib/game/UserManager')

async function GetConnectedUsers(req,res){
    const registered = UserManager.GetAllUsers();
    
    return res.status(200).json({users:registered, count: registered.length})
}

async function GetGameStateById(req,res){
    const game = GameManager.GetGame(req.params.name);
    if (game){
        return res.status(200).json(game.GetState());
    }else{
        return res.status(404).json({message: `Game with id of '${req.params.name}' doesn't exist.`})
    }
    
}

async function GetAllGames(req,res){
    const games = GameManager.GetAllGames();
    return res.status(200).json(games);
}

module.exports ={
    GetConnectedUsers,
    GetGameStateById,
    GetAllGames
}