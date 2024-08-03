"use client";

import { io } from "socket.io-client";
const baseUri = process.env.NEXT_PUBLIC_BASE_URI;

if (!baseUri) {
  throw new Error("NEXT_PUBLIC_BASE_URI is not defined");
}

export default io(baseUri);
