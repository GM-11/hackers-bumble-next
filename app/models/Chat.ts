import { Document, Model, Schema, model, models } from "mongoose";

export interface IChat extends Document {
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: Date;
}

const chatSchema = new Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Chat: Model<IChat> = models.Chat || model<IChat>("Chat", chatSchema);

export default Chat;
