// dependencies
import colors from "colors";
import "dotenv/config";
import express from "express";
import connectMongoDB from "./config/connectMongoDB.js";
import errorHandler from './middlewares/erroHandler.js';
import cookieParser from "cookie-parser";
import cors from "cors";

// router import
import userRouter from "./route/user.js";
import authRouter from "./route/auth.js";

// initilization
const app = express();
colors.enable();

// server vars
const PORT = process.env.PORT || 6000;

// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Cross Origin Support for REST API Access
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))

// static directory
app.use(express.static("public/"));

// routing
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

// error handler
app.use(errorHandler);


// server listen
app.listen(PORT, () => {
  connectMongoDB();
  console.log(`Server running on port ${PORT}`.bgGreen.black);
});
