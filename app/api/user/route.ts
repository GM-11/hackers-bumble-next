import connectMongo from "@/app/lib/connectMongo";
import User, { IUser } from "@/app/models/User";
import bcrypt from "bcryptjs";
import { Lang, Os, Role } from "@/app/utils/types";

export async function POST(req: Request) {
  try {
    connectMongo();
    const { name, email, password, role, os, langs, bio, gender } =
      await req.json();

    if (!name || !email || !password || !role || !os || !langs || !gender) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      os,
      langs,
      bio,
      gender,
    });

    const result = await user.save();
    return Response.json({ message: "User saved", ...result }, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  connectMongo();
  try {
    let users = await User.find();
    let u: {
      id: any;
      name: string;
      email: string;
      role: Role[];
      os: Os;
      langs: Lang[];
      gender: string;
    }[] = [];
    users.forEach((user) => {
      u.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        os: user.os,
        langs: user.langs,
        gender: user.gender,
      });
    });

    return Response.json(u, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
