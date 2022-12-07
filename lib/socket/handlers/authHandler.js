

module.exports = (io, socket) => {

    socket.on('disconnect', (reason)=>{
        //users.removeUser(socket.id);
    })
}