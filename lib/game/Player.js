

const Player = (socket, userId) =>{
    let socketId = socket.id;
    let userId = userId;
    let color;
    let isReady = false;

    return {
        GetSocketId(){
            return socketId;
        },
        GetColor(){
            return color;
        },
        SetColor(color){
            color = value;
        },
        SetIsReady(){
            isReady = true;
        }
    }
}

module.exports = Player;