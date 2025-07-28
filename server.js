const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let onlineUsers = 0;
io.on("connection", (socket) => {
  console.log("New client connected");

  onlineUsers++;
  console.log("✅ User connected. Online:", onlineUsers);

  io?.emit("online-users", onlineUsers);

  socket.on("disconnect", () => {
    onlineUsers = Math.max(onlineUsers - 1, 0);
    console.log("❌ User disconnected. Online:", onlineUsers);
    io?.emit("online-users", onlineUsers);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
