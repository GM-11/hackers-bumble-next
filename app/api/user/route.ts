import bcrypt from "bcryptjs";
import { Lang, Os, Role } from "@/app/lib/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password, role, os, langs, bio, gender } =
      await req.json();

    if (!name || !email || !password || !role || !os || !langs || !gender) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    await prisma.$connect();

    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        os,
        langs,
        bio,
        gender,
      },
    });

    return Response.json({ message: "User saved", ...result }, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  await prisma.$connect();
  try {
    let users = await prisma.user.findMany({});
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
        role: user.role as string,
        os: user.os as string,
        langs: user.langs,
        gender: user.gender,
      });
    });

    return Response.json(u, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
