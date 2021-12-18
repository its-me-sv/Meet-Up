const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const origins = [
    "*"
];
const io = new Server(httpServer, {
    cors: {
        origin: [...origins]
    }
});
const users = {};
io.on("connection", socket => {
    console.log(`${socket.id} connected`);
    users[socket.handshake.query.userId] = socket.id;
    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`);
    });
    socket.on("new-message", ({ to: recipient, data }) => {
        if (users[recipient]) {
            io.to(users[recipient]).emit("new-message", data);
        }
    });
});

const PORT = process.env.PORT || 5002;
httpServer.listen(PORT, () => {
    console.clear();
    console.log(`[Socket Server] Listening to PORT ${PORT}`);
});