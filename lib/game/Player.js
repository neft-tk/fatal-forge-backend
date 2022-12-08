const Player = (socket) =>{
    let socketId = socket.id;

    return {
        getSocketId(){
            return socketId;
        }
    }
}

module.exports = Player;