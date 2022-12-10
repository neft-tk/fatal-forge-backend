const UserManager = require('../../game/UserManager');

module.exports = (io, socket) => {

    socket.on('register', (userData)=>{
        UserManager.RegisterUser(socket,userData);
        console.log(`socket: ${socket.id} registered as ${userData}`)
    })

    socket.on('disconnect', (reason)=>{
        console.log(`socket ${socket.id} unregistering from ${socket.userInfo.username}`)
        UserManager.UnregisterSocket(socket);
        
    })
}