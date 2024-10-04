import { AppError, AppResponse, cookieOptions } from "../utils/index.js";
import { generateTemporaryToken, generateTokens } from "../lib/index.js";
import { UserModel } from "../models/index.js";
import { asyncHandler } from "../middlewares/index.js";

export const getUser = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .json(new AppResponse(200, { user: req.user, profile: req.profile }));
});
