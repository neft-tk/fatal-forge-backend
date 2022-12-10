const UserManager = require('../../game/UserManager');

module.exports = (io, socket) => {

    socket.on('register', (userData)=>{
        UserManager.RegisterUser(socket,userData);
        console.log(`socket: ${socket.id} registered as ${userData.username}`)
    })

    socket.on('disconnect', (reason)=>{
        if (socket.userInfo){
            console.log(`socket ${socket.id} unregistering from ${socket.userInfo.username}`)
            UserManager.UnregisterSocket(socket);
        }
    })
}