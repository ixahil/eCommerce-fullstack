import mongoose, { Schema } from "mongoose";

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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

BrandSchema.statics.findOrCreate = async function ({name, handle}) {
  let brand = await this.findOne({ handle });
  if (!brand) {
    brand = await this.create({ name, handle });
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

export const BrandModel = mongoose.model("Brand", BrandSchema);
