import { configDotenv } from "dotenv";
import { UserModel } from "../models/index.js";
import { AppError } from "../utils/index.js";
import { asyncHandler } from "./index.js";
import jwt from "jsonwebtoken";

configDotenv()

const accessTokenSecret = process.env.ACCESSTOKENSECRET;

export const authenticate = asyncHandler(async (req, res, next) => {
  
  const token =
    req.cookies?.access_token ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) throw new AppError(401, "unAuthorized Request!");
  try {
    const decoded = jwt.verify(token, accessTokenSecret);
    const user = await UserModel.findById(decoded._id)
      .select(
        "-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiresAt"
      )
      .populate("profile");

    const { profile, ...loggedInUser } = user._doc;

    if (!user) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      throw new AppError(401, "Invalid Access Token!");
    }

    req.user = loggedInUser;
    req.profile = profile;

    next();
  } catch (error) {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    throw new AppError(401, error?.message || "Invalid token!");
  }
});
