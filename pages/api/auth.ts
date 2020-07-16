import dbConnect from "../../helpers/dbConnect";
import { decode } from "../../helpers/jwt";
import UserModel from "../../models/user";

export const authenticate = async (req) => {
  const token = req.headers["authorization"].split(" ")[1].trim();

  const decoded = await decode(token);

  return decoded;
};

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      const token = req.headers["authorization"].split(" ")[1].trim();
      const decoded = await authenticate(req);

      const user = await UserModel.findOne({ email: decoded.email });

      if (user) {
        if (user.id === decoded.id) {
          res.status(200).send({ token, user });
        } else {
          res.status(401).send({ error: "Unauthenticated" });
        }
      } else {
        res.status(404).send({ error: "User not found" });
      }
  }
}
