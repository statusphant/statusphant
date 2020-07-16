import jwt from "jsonwebtoken";

export interface Payload {
  id: string;
  email: string;
  iat?: string;
}

const encode = async (payload: Payload) =>
  await jwt.sign(payload, process.env.SECRET);

const decode = async (token: string): Promise<Payload> => {
  const decoded = await jwt.verify(token, process.env.SECRET);
  if (typeof decoded !== "string") {
    return decoded as Payload;
  } else {
    return {} as Payload;
  }
};

export { encode, decode };
