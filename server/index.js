const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRouter = require("./routers/user.router");
const messageRouter = require("./routers/message.router");
dotenv.config();
const { app, server } = require("./lib/socket");

const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;
const MONGODB = process.env.MONGODB;

app.get("/", (req, res) => {
  res.send("Welcome to MERN CHAT SERVER 110");
});
app.use(
  cors({
    origin: [BASE_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
    credentials: true,
  }),
);
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user/", userRouter);
app.use("/api/v1/message", messageRouter);
//connect to DB
if (!MONGODB) {
  console.log("No MONGODB URL found in .env");
} else {
  mongoose
    .connect(MONGODB)
    .then(() => {
      console.log("Connect to database successfully");
    })
    .catch((error) => {
      console.log("Mongo DB connection error:", error);
    });
}
server.listen(PORT, () => {
  console.log("Server on http://localhost:" + PORT);
});
