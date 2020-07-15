import { Request, Response } from "express";
import UserModel, { schema, User } from "./model";

import { encode } from "../../helpers/jwt";

const create = async (req: Request, res: Response) => {
  const userRequest: User = req.body;
  const isValidRequest = await schema.isValid(userRequest);

  if (isValidRequest) {
    const user = await UserModel.findOne({ email: userRequest.email });
    let newUser = null;
    if (user) {
      newUser = user;
    } else {
      newUser = new UserModel(userRequest);
      await newUser.save();
    }
    const token = await encode({
      id: newUser.id,
      email: newUser.email,
    });
    res.status(200).send({
      user: newUser,
      token: token,
    });
  } else {
    // TODO handle invv schema
    res.send({
      error: isValidRequest,
    });
  }
};

export default {
  create,
};
