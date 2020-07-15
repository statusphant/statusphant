import dbConnect from "../../../helpers/dbConnect";
import { encode } from "../../../helpers/jwt";

import UserModel, { schema, User } from "../../../models/user";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      const userRequest: User = req.body;

      schema
        .validate(userRequest)
        .then(async (value) => {
          let user = await UserModel.findOne({ email: userRequest.email });

          if (!user) {
            user = new UserModel(userRequest);

            await user.save();
          } else {
          }

          const token = await encode({
            id: user.id,
            email: user.email,
          });

          res.status(201).send({ token, user });
        })
        .catch((err) => {
          res.status(401).send({
            errors: err.errors,
          });
        });

      break;

    default:
      res.status(405).send({ error: `METHOD: ${method} is not allowed` });
  }
}
