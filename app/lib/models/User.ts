import { Document, Model, Schema, model, models } from "mongoose";
import { Role, Lang, Os, Gender } from "../utils/types";
import { IChatRoom } from "./ChatRoom";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  bio: string;
  role: Role[];
  langs: Lang[];
  os: Os;
  chats: IChatRoom[];
  gender: Gender;
}

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "" },
  role: { type: [String], enum: Object.values(Role), required: true },
  langs: { type: [String], enum: Object.values(Lang), default: [] },
  os: { type: String, enum: Object.values(Os), required: true },
  chats: { type: [Schema.Types.ObjectId], ref: "ChatRoom", default: [] },
  gender: { type: String, enum: Object.values(Gender), required: true },
});

const User: Model<IUser> = models.User || model<IUser>("User", userSchema);
export default User;
