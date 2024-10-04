import { Schema, model } from "mongoose";
import { CartModel } from "./index.js";

const profileSchema = new Schema(
  {
    fullName: {
      type: String,
      default: "John Doe",
      required: true,
    },
    phone: {
      type: Number,
      default: 9999999999,
    },
    avatar: { type: String, default: "/placeholders/user.jpg" },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    addressBook: [{ type: Schema.Types.ObjectId, ref: "AddressBook" }],
  },
  { timestamps: true }
);

profileSchema.statics.add = async function (owner) {
  const profile = await this.create({ owner: owner._id });
  const cart = await CartModel.create({ profile: profile._id });
  profile.cart = cart._id;
  profile.save();
  return profile;
};

export const ProfileModel = model("Profile", profileSchema);
