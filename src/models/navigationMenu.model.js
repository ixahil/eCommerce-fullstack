import mongoose, { Schema } from "mongoose";
import { AppError } from "../utils/index.js";

const MenuItem = new Schema({
  label: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
    required: true,
  },
  children: [],
});

const NavigationMenu = new Schema(
  {
    name: {
      type: String,
      required: [true, "Menu Name is required"],
      trim: true,
      unique: true,
    },
    handle: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    menu: [MenuItem],
  },
  { timestamps: true }
);

export const NavigationMenuModel = mongoose.model(
  "NavigationMenu",
  NavigationMenu
);
