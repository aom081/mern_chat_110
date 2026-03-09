require("dotenv").config();
const app = require("express")();
const userSocketMap = []; //{userId:socketId}
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: [process.env.BASE_URL],
  },
});
//return socketId
function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log("UserSocketMap", userSocketMap);
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    delete userSocketMap[userId];
    console.log("UserSocketMap", userSocketMap);
  });
});

module.exports = { io, app, server, getReceiverSocketId };
