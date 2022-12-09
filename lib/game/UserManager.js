
const userManager = () =>{
    const users = new Map();
    return {
        RegisterUser(socket, userInfo){
            users.set(userInfo.id, {
                userinfo: userInfo,
                socketId: socket.id
            });
            socket.userInfo = userInfo;
        },
        UnregisterByUserId(userId){
            users.delete(userId)
        },
        UnregisterSocket(socket){
            if (socket.userInfo){
                users.delete(socket.userInfo.id)
                delete socket.userInfo;
            }
        },
        GetAllUsers(){
            return users.values;
        }

    }
}

const UserManager = userManager();

module.exports = UserManager;