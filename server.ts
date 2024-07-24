// server.ts
import express, { Request, Response } from "express";
import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server } from "socket.io";
import connectMongo from "./app/lib/utils/connectMongo";
import { sockerServerHandler } from "./app/lib/utils/socketServer";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);
  const io = new Server(httpServer);

  connectMongo();

  sockerServerHandler(io);

  //   io.on("connection", (socket) => {
  //     console.log("New client connected");
  //     // socket.on("message", (data) => {
  //     //   console.log("Message received:", data);
  //     //   io.emit("message", data);
  //     // });

  //     // socket.on("disconnect", () => {
  //     //   console.log("Client disconnected");
  //     // });
  //   });

  server.get("*", (req: Request, res: Response) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, (err?: any) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
