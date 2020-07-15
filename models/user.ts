import mongoose from "mongoose";
import { object, string } from "yup";

export interface User extends mongoose.Document {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

export const schema = object().shape({
  id: string().required("user id is required"),
  email: string().required("user email is required"),
  name: string().required("user name is required"),
  avatar: string(),
});

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    app: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Users ||
  mongoose.model<User>("Users", UserSchema);
