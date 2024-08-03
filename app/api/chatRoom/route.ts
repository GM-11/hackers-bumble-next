import socketClient from "@/app/lib/socketClient";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import { generateChatRoomId } from "@/app/lib/generteIds";

export async function POST(req: Request) {
  try {
    const { senderEmail, receiverEmail } = await req.json();
    const chatRoomId = await generateChatRoomId(senderEmail, receiverEmail);

    const sender = await prisma.user.findUnique({
      where: { email: senderEmail },
    });
    const receiver = await prisma.user.findUnique({
      where: { email: receiverEmail },
    });

    if (!sender || !receiver) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    if (!chatRoomId) {
      return Response.json(
        { error: "Cannot chat with yourself" },
        { status: 400 }
      );
    }

    const result = await prisma.chatRoom.create({
      data: {
        senderId: sender.id,
        receiverId: receiver.id,
        roomId: chatRoomId,
      },
    });

    return Response.json(
      { message: "Chat room created", ...result },
      { status: 200 }
    );
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
