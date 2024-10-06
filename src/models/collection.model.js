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
    status: {
      type: String,
      enum: ["ACTIVE", "DRAFT"],
    },
  },
  { timestamps: true }
);

CollectionSchema.statics.findOrCreate = async function (collectionHandle) {
  let collection = await this.findOne({ handle: collectionHandle });

  if (!collection) {
    throw new AppError(404, "Collection Not Found");
  }

  return collection;

  // const allCollections = await Promise.all(
  //   collections.map(async ({ name, handle }) => {
  //     try {
  //       // Find or create each collection
  //       let collection = await this.findOne({ handle });
  //       if (!collection) {
  //         collection = await this.create({ name, handle });
  //       }
  //       return collection;
  //     } catch (error) {
  //       console.log(error);
  //       throw new Error(error);
  //     }
  //   })
  // );

  // return allCollections;
};

CollectionSchema.statics.removeProduct = async function (
  collectionId,
  productId
) {
  await this.findByIdAndUpdate(
    collectionId,
    { $pull: { products: productId } },
    { new: true }
  );
};

CollectionSchema.methods.removeProduct = function (productId) {
  return (this.products = this.products.filter(
    (product) => product.toString() !== productId.toString()
  ));
};

export const CollectionModel = mongoose.model("Collection", CollectionSchema);
