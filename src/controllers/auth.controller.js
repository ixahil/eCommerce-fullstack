import { generateTemporaryToken, generateTokens } from "../lib/index.js";
import { asyncHandler } from "../middlewares/index.js";
import { UserModel } from "../models/index.js";
import { AppResponse, cookieOptions } from "../utils/index.js";

// New User
export const register = asyncHandler(async (req, res, next) => {
  const user = await UserModel.create(req.body);

  const { refreshToken } = generateTokens(user._id);

  const { hashedToken, tokenExpiry, unHashedToken } = generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationTokenExpiresAt = tokenExpiry;
  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  res.status(201).json(new AppResponse(201, null, "User created successfully"));
});

export const login = asyncHandler(async (req, res, next) => {
  const user = await UserModel.login(req.body);
  const { accessToken, refreshToken } = generateTokens(user._id);
  const {
    refreshToken: userRefreshToken,
    emailVerificationToken,
    emailVerificationTokenExpiresAt,
    profile,
    ...loggedInUser
  } = user._doc;

  res
    .status(200)
    .cookie("access_token", accessToken, cookieOptions)
    .cookie("refresh_token", refreshToken, cookieOptions)
    .json(
      new AppResponse(
        200,
        { user: loggedInUser, profile },
        "Logged in Successfully"
      )
    );
});

export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.status(200).json(new AppResponse(200, null, "Logged out successfully"));
});
