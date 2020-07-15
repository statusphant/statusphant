import { decode } from "../../../helpers/jwt";
import UserModel from "../users/model";

const auth = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1].trim();

  const decoded = await decode(token);

  const user = await UserModel.findOne({ email: decoded.email });

  if (user) {
    if (user.id === decoded.id) {
      req.user = user;
      res.status(200).send({
        user,
      });
    } else {
      res.send({
        ok: 1,
      });
    }
  } else {
    res.send({
      error: true,
    });
  }
};

export default auth;
