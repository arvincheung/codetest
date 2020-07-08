module.exports = function(io) {
  io.on('connection', socket => {
    console.log(`New socket ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Disconnected socket ${socket.id}`);
    });
  });
}
