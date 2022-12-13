const UserManager = require('../../game/UserManager');
const GameManager = require('../../game/GameManager')
module.exports = (io, socket) => {

    socket.on('register', (userData)=>{
        UserManager.RegisterUser(socket,userData);
        console.log(`socket: ${socket.id} registered as ${userData.username}`);
    })

    socket.on('disconnect', (reason)=>{
        if (socket.userData){
            console.log(`socket ${socket.id} unregistering from ${socket.userData.username}`);
            if (socket.gameId){
                const game = GameManager.GetGame(socket.gameId)
                if (game){
                    game.DisconnectPlayer(socket);
                }
            }
            UserManager.UnregisterSocket(socket);
        }
    })
}