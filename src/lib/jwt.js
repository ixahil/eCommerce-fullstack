import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

configDotenv();

const accessTokenSecret = process.env.ACCESSTOKENSECRET;
const refreshTokenSecret = process.env.REFRESHTOKENSECRET;
const accessTokenExpiresIn = process.env.ACCESSTOKENEXPIRESIN;
const refreshTokenExpiresIn = process.env.REFRESHTOKENEXPIRESIN;

export const generateTokens = (id) => {
  const accessToken = jwt.sign({ _id: id }, accessTokenSecret, {
    expiresIn: accessTokenExpiresIn,
  });
  const refreshToken = jwt.sign({ _id: id }, refreshTokenSecret, {
    expiresIn: refreshTokenExpiresIn,
  });

  return { accessToken, refreshToken };
};
