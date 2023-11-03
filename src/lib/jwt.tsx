import jwt from "jsonwebtoken";

export const jwtSignIn = async (id:any) => {
  const secret = process.env.NODE_ENV;
  const token = jwt.sign(id, secret,  {expiresIn: "6d"});
  return;
};

export const jwtVerify = (token: any) => {
  try {
    const secret:any = process.env.SECRET_Key;
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};
