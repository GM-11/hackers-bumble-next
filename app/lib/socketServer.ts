import { Server } from "socket.io";
import Chat from "../models/Chat";
import ChatRoom from "../models/ChatRoom";

export async function sockerServerHandler(io: Server) {
  io.on("connection", (socket) => {
    
    socket.on("joinRoom", async (roomId: string) => {
      socket.join(roomId);
    });

    socket.on("sendMessage", async (messageData) => {
      const { senderId, receiverId, message, roomId } = messageData;

      const chat = new Chat({
        senderId,
        receiverId,
        message,
        timestamp: new Date(),
      });

      const room = await ChatRoom.findById(roomId);
      if (!room) {
        return;
      }

      room.messages.push(chat);
      await room.save();

      io.to(roomId).emit("message", chat);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
}
