
const Player = (socket) =>{
    return {
        userData: socket.userData,
        color: null,
        isReady: false,
        isConnected:true,
        score:0
    }
}

module.exports = Player;