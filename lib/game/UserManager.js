
const userManager = () =>{
    const users = new Map();
    return {
        RegisterUser(socket, userData){
            users.set(userData.username, {
                username: userData.username,
                email: userData.email,
                id: userData.id,
                socketId: socket.id
            });
            socket.userData = userData;
        },
        UnregisterByUserId(username){
            users.delete(username)
        },
        UnregisterSocket(socket){
            if (socket.userData){
                users.delete(socket.userData.username)
                delete socket.userData;
            }
        },
        GetAllUsers(){
            return [...users.values()]
        }

    }
}

const UserManager = userManager();

module.exports = UserManager;