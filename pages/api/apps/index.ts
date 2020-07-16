import dbConnect from "../../../helpers/dbConnect";
import { authenticate } from "../auth";
import UserModel from "../../../models/user";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      const decoded = await authenticate(req);
      const { email, app } = req.body;

      if (decoded.email === email) {
        const user = await UserModel.findOne({ email });

        if (user.app) {
          res.status(401).send({
            error: "You already have an app integrated with your account",
          });
        } else {
          user.app = app;
          await user.save();
          res.status(201).send({
            message: `Added ${app} for ${email}`,
          });
        }
      } else {
        res.status(401).send({
          error: "You are unauthorized",
        });
      }
      break;
    default:
      res.status(405).send({ error: `METHOD: ${method} is not allowed` });
  }

  await dbConnect();
}
