
const Player = (socket, userID = "WIP") =>{
    let socketId = socket.id;
    let userId = userID;
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
        },
        GetUserId(){
            return userId;
        },
        GetState(){
            return {
                socketId,
                userId,
                color,
                isReady
            }
        }
    }
}

module.exports = Player;