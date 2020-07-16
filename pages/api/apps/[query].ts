import dbConnect from "../../../helpers/dbConnect";

import UserModel from "../../../models/user";

export default async function handler(req, res) {
  const {
    method,
    query: { query },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      const app = await UserModel.findOne({ app: query });
      if (app) {
        res.status(400).send({
          exist: true,
        });
      } else {
        res.status(200).send({
          exist: false,
        });
      }
      break;

    default:
      res.status(405).send({ error: `METHOD: ${method} is not allowed` });
  }
}
