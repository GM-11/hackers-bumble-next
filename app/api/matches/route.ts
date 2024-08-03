import { Role, Os, Lang } from "@/app/lib/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const gender = searchParams.get("gender");
    const oppGender = gender === "male" ? "female" : "male";
    let users = await prisma.user.findMany({ where: { gender: oppGender } });
    let u: {
      id: any;
      name: string;
      email: string;
      role: String;
      os: String;
      langs: String[];
      gender: string;
    }[] = [];
    users.forEach((user) => {
      u.push({
        id: user.id,
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
