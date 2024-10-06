import mongoose, { Schema } from "mongoose";
import { AppError } from "../utils/index.js";

const BrandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Brand Name is required"],
      trim: true,
      unique: true,
    },
    handle: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      default: null,
    },
    products: [
      {
        ref: "Product",
        type: Schema.Types.ObjectId,
      },
    ],
    image: {
      public_id: {
        type: String,
        default: "products/cg9i5zfdrprw7wj1lngk",
      },
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/diggcdfvp/image/upload/v1726914401/products/cg9i5zfdrprw7wj1lngk.png",
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

BrandSchema.statics.findOrCreate = async function (brandHandle) {
  let brand = await this.findOne({ handle: brandHandle });
  if (!brand) {
    // brand = await this.create({ name, handle });
    throw new AppError(404, "Brand Not Found");
  }
  return brand;
};

BrandSchema.statics.removeProduct = async function (brandId, productId) {
  await this.findByIdAndUpdate(
    brandId,
    { $pull: { products: productId } },
    { new: true }
  );
};

BrandSchema.methods.removeProduct = function (productId) {
  return (this.products = this.products.filter(
    (product) => product.toString() !== productId.toString()
  ));
};

export const BrandModel = mongoose.model("Brand", BrandSchema);
