const UserManager = require('../../game/UserManager');

module.exports = (io, socket) => {

    socket.on('register', (userData)=>{
        UserManager.RegisterUser(userData);
    })

    socket.on('disconnect', (reason)=>{
        UserManager.UnregisterSocket(socket);
    })
}