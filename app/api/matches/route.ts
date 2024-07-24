import connectMongo from "@/app/lib/utils/connectMongo";
import User from "@/app/lib/models/User";
import { Role, Os, Lang } from "@/app/lib/utils/types";

export async function GET(req: Request) {
  connectMongo();
  try {
    const searchParams = new URL(req.url).searchParams;
    const gender = searchParams.get("gender");
    const oppGender = gender === "male" ? "female" : "male";
    let users = await User.find({ gender: oppGender });
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
