const Player = (socketId) =>{
    let socketId = socketId;

    return {
        getSocketId(){
            return socketId;
        }
    }
}

module.exports = Player;