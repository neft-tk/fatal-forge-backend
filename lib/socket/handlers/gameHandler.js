

module.exports = (io, socket) => {
    socket.on('createGame', (data)=>{
        
    })

    socket.on('disconnect', (reason)=>{
        //users.removeUser(socket.id);
    })
}