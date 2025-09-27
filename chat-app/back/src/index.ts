import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message.toString());

    if (parsedMessage.type === "join") {
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
    }

    if (parsedMessage.type === "chat") {
      // find the sender’s room
      const currentUser = allSockets.find((u) => u.socket === socket);
      if (!currentUser) return;

      const currentUserRoom = currentUser.room;

      // broadcast only to users in the same room
      for (const user of allSockets) {
        if (
          user.room === currentUserRoom &&
          user.socket.readyState === WebSocket.OPEN
        ) {
          user.socket.send(parsedMessage.payload.message);
        }
      }
    }
  });
});
