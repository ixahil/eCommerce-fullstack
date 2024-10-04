import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { ProfileModel } from "./index.js";
import { AppError } from "../utils/index.js";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "USER",
      enum: ["ADMIN", "USER"],
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    status: {
      type: String,
      default: "ACTIVE",
      enum: ["ACTIVE", "INACTIVE", "DELETED", "SUSPENDED"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordTokenExpiresAt: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationTokenExpiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  else {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});

userSchema.post("save", async function (user, next) {
  // const existingProfile = await ProfileModel.findOne({owner: user._id})
  if (!user.profile) {
    let profile = await ProfileModel.add({ _id: user._id });
    user.profile = profile._id;
    await user.save();
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.statics.login = async function (userData) {
  const user = await UserModel.findOne({ username: userData.username })
    .select("+password")
    .populate("profile");
  if (!user) throw new AppError(400, "Invalid Credentials!");
  const isMatch = await user.comparePassword(userData.password);
  if (!isMatch) throw new AppError(400, "Invalid Credentials!");
  return user;
};

userSchema.methods.generateRefreshToken = function () {};
userSchema.methods.generateRefreshToken = function () {};

export const UserModel = model("User", userSchema);
