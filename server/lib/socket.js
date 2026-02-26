require('dotenv').config();
const server = require('http').createServer();
const app = require("express")();
const userSocketMap = []; //{userId: socketId}
const io = require('socket.io')(server, {
    cors: {
        origin: [process.env.BASE_URL],
    },
});
//return socketId 
function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);
    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
        console.log("userSocketMap:", userSocketMap);
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
        delete userSocketMap[userId];
        console.log("userSocketMap:", userSocketMap);
    });
});

module.exports = {io, app, server};
