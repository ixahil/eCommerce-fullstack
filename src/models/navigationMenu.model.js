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
  depth: {
    type: Number,
  },
  parentId: {
    type: String,
    default: null,
  },
  id: {
    type: String,
  },
  index: {
    type: Number,
  },
  isLast: {
    type: Boolean,
    default: false,
  },
  parent: {
    type: String,
    default: null,
  },
});

MenuItem.add({
  children: [MenuItem],
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
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const NavigationMenuModel = mongoose.model(
  "NavigationMenu",
  NavigationMenu
);
