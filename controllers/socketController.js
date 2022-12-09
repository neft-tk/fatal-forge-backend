const GameManager = require('../lib/game/GameManager');
const UserManager = require('../lib/game/UserManager')

async function GetConnectedUsers(req,res){
    const registered = UserManager.GetAllUsers();
    
    return res.status(200).json({users:registered, count: registered.length})
}

async function CheckRoomName(req,res){
    const game = GameManager.GetGame(req.params.name);
    return res.status(200).json({exists: game ? true : false})
}

module.exports ={
    GetConnectedUsers,
    CheckRoomName
}