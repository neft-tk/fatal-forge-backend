
const Player = (socket) =>{
    return {
        userData: socket.userData,
        color: null,
        isReady: false
    }
}

module.exports = Player;