import mongoose, { Schema } from "mongoose";
import { AppError } from "../utils/index.js";

const storeConfig = new Schema(
  {
    name: {
      type: String,
      default: "Store",
    },
    logo: {
      type: String,
      default:
        "https://res.cloudinary.com/diggcdfvp/image/upload/v1728471904/storeData/site-logo.png",
    },
    mainMenu: {
      type: Schema.Types.ObjectId,
      ref: "NavigationMenu",
    },
    footerMenu: {
      type: Schema.Types.ObjectId,
      ref: "NavigationMenu",
    },
    isDeafult: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const StoreConfigModel = mongoose.model("storeConfig", storeConfig);
