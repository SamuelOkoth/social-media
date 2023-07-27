import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

import { authRouter } from "./routes/authRoutes.js";
import { postsRouter } from "./routes/postsRoutes.js";
import { likesRouter } from "./routes/likesRoutes.js";
import { commentsRouter } from "./routes/commentRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { friendsRouter } from "./routes/followsControllers.js";
import { messageRouter } from "./routes/messagingRoutes.js";

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// App routes
app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/likes", likesRouter);
app.use("/messages", messageRouter);
app.use("/comments", commentsRouter);
app.use("/friends", friendsRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.json("Hello there");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("A client connected.");
  socket.on("chatMessage", async (data) => {
    try {
      console.log(data);
      socket.emit("chatMessage", data);
      await saveMessage(data.senderID, data.recipientID, data.messageContent);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is up and listening on port ${PORT}`);
});
