module.exports = (io, socket) => {

  socket.on("send-message", (message) => {
      console.log(message)
      socket.emit("recieve-message", message);
  })
}