import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import * as middlewares from "./middlewares";
import MessageResponse from "./interfaces/MessageResponse";
import { authRouter } from "./routes/auth/auth.routes";
import { connectToDb } from "./db/connectToDb";

require("dotenv").config();

export const pool = connectToDb();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    exposedHeaders: ["Set-Cookie"],
  })
);
app.use(express.json());

app.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/auth", authRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
