import mongoose, { Schema } from "mongoose";
import { AppError } from "../utils/index.js";

const CollectionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Collection Name is required"],
      trim: true,
      unique: true,
    },
    handle: {
      type: String,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      default: null,
    },
    order: {
      type: Number,
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

CollectionSchema.statics.findOrCreate = async function (collections) {
  const allCollections = await Promise.all(
    collections.map(async ({ name, handle }) => {
      try {
        // Find or create each collection
        let collection = await this.findOne({ handle });
        if (!collection) {
          collection = await this.create({ name, handle });
        }
        return collection;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    })
  );

  return allCollections;
};

CollectionSchema.statics.removeProduct = async function (collectionId, productId) {
  await this.findByIdAndUpdate(
    collectionId,
    { $pull: { products: productId } },
    { new: true }
  );
};

export const CollectionModel = mongoose.model("Collection", CollectionSchema);
