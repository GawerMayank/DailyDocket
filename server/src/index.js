import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./db/connectDB.js";
import todoRouter from "./routes/todo.routes.js";

//Configure environment variables
dotenv.config({
  path: "./.env",
});

//Connect Database
connectDB();

//Initialize app
const app = express();
const PORT = process.env.PORT || 8000;

//Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors());

//Routes
app.get("/", (req, res) => {
  res.send("Hello from server!!");
});
app.use("/api/v1/todos", todoRouter);

//Server started
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
