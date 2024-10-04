import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    orderNumber: {
      type: Number,
      default: orderNumber,
      unique: true,
    },
    orderPrice: {
      type: Number,
      required: true,
    },
    discountedOrderPrice: {
      type: Number,
      required: true,
    },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, min: 1, default: 1 },
      },
    ],
    status: {
      type: String,
      enum: ["PENDING", "SHIPPED", "CANCELLED", "DELIVERED", "REFUNDED"],
      default: "PENDING",
    },
    AddressBook: {
      type: Schema.Types.ObjectId,
      ref: "AddressBook",
      default: null,
    },
    isPaymentDone: {
      type: Boolean,
      default: false,
    },
    coupon: {
      type: Schema.Types.ObjectId,
      ref: "Coupon",
      default: null,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  { timestamps: true }
);

function orderNumber() {
  let now = Date.now().toString(); // '1492341545873'
  // pad with extra random digit
  now += now + Math.floor(Math.random() * 10);
  // format
  return [now.slice(6, 10), now.slice(10, 14)].join("");
}

export const OrderModel = model("Order", orderSchema);
