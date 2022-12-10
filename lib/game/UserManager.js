
const userManager = () =>{
    const users = new Map();
    return {
        RegisterUser(socket, username){
            users.set(username, {
                username: username,
                socketId: socket.id
            });
            socket.userInfo = {
                username: username
            };
        },
        UnregisterByUserId(username){
            users.delete(username)
        },
        UnregisterSocket(socket){
            if (socket.userInfo){
                users.delete(socket.userInfo.username)
                delete socket.userInfo;
            }
        },
        GetAllUsers(){
            return Array.from(users.keys());
        }

    }
}

const UserManager = userManager();

module.exports = UserManager;