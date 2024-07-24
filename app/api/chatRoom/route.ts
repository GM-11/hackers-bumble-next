import connectMongo from "@/app/lib/utils/connectMongo";
import socketClient from "@/app/lib/utils/socketClient";
import ChatRoom, { IChatRoom } from "@/app/lib/models/ChatRoom";
import User from "@/app/lib/models/User";
import { generateChatRoomId } from "@/app/lib/utils/generteIds";

export async function POST(req: Request) {
  try {
    connectMongo();
    const { senderEmail, receiverEmail } = await req.json();
    const chatRoomId = await generateChatRoomId(senderEmail, receiverEmail);

    const sender = await User.findOne({ email: senderEmail });
    const receiver = await User.findOne({ email: receiverEmail });

    if (!sender || !receiver) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    if (!chatRoomId) {
      return Response.json(
        { error: "Cannot chat with yourself" },
        { status: 400 }
      );
    }

    const room = new ChatRoom({
      senderId: sender._id,
      receiverId: receiver._id,
      roomId: chatRoomId,
    });

    if (sender.chats.includes(room) || receiver.chats.includes(room)) {
      return Response.json(
        { message: "Chat room already exists" },
        { status: 200 }
      );
    }

    sender.chats.push(room);
    receiver.chats.push(room);

    await sender.save();
    await receiver.save();
    await room.save();

    return Response.json({ message: "Chat room created" }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { senderEmail, receiverEmail } = await req.json();
    const chatRoomId = await generateChatRoomId(senderEmail, receiverEmail);

    socketClient.emit("joinRoom", chatRoomId);
    return Response.json({ message: "Joined room" }, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
