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


io.on("connection", socket => {
    console.log(`${socket.id} connected`);
    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`);
    });
});

const PORT = process.env.PORT || 5002;
httpServer.listen(PORT, () => {
    console.clear();
    console.log(`[Socket Server] Listening to PORT ${PORT}`);
});