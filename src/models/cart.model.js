import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  profile: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, min: 1, default: 1 },
      default: [],
    },
  ],
});

export const CartModel = model("Cart", cartSchema);
