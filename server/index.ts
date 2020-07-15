require("dotenv-safe").config();

import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import next from "next";

import apiHandler from "../pages/api";

const PORT: number = parseInt(process.env.PORT, 10) || 3000;

const dev: boolean = process.env.NODE_ENV !== "production";

const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();

  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  server.use(cors());

  server.use(
    bodyParser.json({
      type: "application/json",
    })
  );

  // server.use("/api", apiHandler);

  server.all("*", (req: Request, res: Response) => handle(req, res));

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
