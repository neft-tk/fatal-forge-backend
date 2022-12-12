
const Player = (socket) =>{
    return {
        userData: socket.userData,
        color: null,
        isReady: false,
        isConnected:true
    }
}

module.exports = Player;