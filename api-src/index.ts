import { Router, Request, Response } from "express";

// middlewares
import auth from "./middlewares/auth";

import UserAPI from "./users";

const api = Router();

api.get("/health-check", (req: Request, res: Response) => {
  res.status(200);
  res.send("All Okay!");
});

api.post("/auth", auth);

api.post("/users", UserAPI.create);

export default api;
