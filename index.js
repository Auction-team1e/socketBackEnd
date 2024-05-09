const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
    transports: ["websocket"],
  },
  allowEIO3: true,
});

io.on("connection", (socket) => {
  socket.on(`send-bid-message`, (message) => {
    socket.broadcast.emit("chat-message", message);
    console.log("🚀 ~ socket.on ~ message:", message);
  });
});

io.listen(5000);
