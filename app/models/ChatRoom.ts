import { Document, Model, Schema, model, models } from "mongoose";
import { IChat } from "./Chat";

export interface IChatRoom extends Document {
  senderId: string;
  receiverId: string;
  messages: IChat[];
  roomId: string;
}

const roomSchema = new Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  messages: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
  roomId: { type: String, required: true },
});

const ChatRoom: Model<IChatRoom> =
  models.ChatRoom || model<IChatRoom>("Chat", roomSchema);

export default ChatRoom;
