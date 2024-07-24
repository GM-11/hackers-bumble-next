import User from "@/app/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await User.findById(params.userId);
    if (user) {
      return Response.json(user, { status: 200 });
    } else {
      return Response.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
