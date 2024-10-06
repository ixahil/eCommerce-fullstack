import mongoose, { Schema } from "mongoose";
import { CollectionModel } from "./collection.model.js";
import { BrandModel } from "./brand.model.js";

const productSchema = new Schema(
  {
    name: {
      required: [true, "Product Name is required"],
      type: String,
    },
    sku: {
      type: String,
      required: [true, "Product SKU is Required"],
      unique: true,
      index: {
        unique: true,
      },
    },
    description: {
      type: String,
    },
    // collections: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
    collections: { type: Schema.Types.ObjectId, ref: "Collection" },
    brand: { type: Schema.Types.ObjectId, ref: "Brand", default: null },
    price: {
      default: 0,
      type: Number,
    },
    salePrice: {
      default: 0,
      type: Number,
    },
    stock: {
      default: 0,
      type: Number,
    },
    thumbnail: {
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
    images: {
      type: [
        {
          url: String,
          public_id: String,
        },
      ],
      default: [],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isFreeShipping: {
      type: Boolean,
      default: false,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "DRAFT", "DELETED"],
      default: "ACTIVE",
    },
    handle: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

// productSchema.methods.assignCollectionsAndBrand = async function (
//   collections,
//   brand
// ) {
//   const product = this;

//   const newCollectionsSet = new Set(
//     collections.map((collection) => collection._id.toString())
//   );

//   const collectionsToRemove = product.collections.filter(
//     (collId) => !newCollectionsSet.has(collId.toString())
//   );

//   // console.log("getting collections new", collections);
//   // console.log("ids of removing collections", collectionsToRemove);
//   // console.log("ids of previous collections", product.collections);

//   for (const id of collectionsToRemove) {
//     await CollectionModel.removeProduct(id, product._id);
//     if (product.collections.includes(id)) {
//       product.collections = product.collections.filter(
//         (collId) => !collectionsToRemove.includes(collId)
//       );
//     }
//   }

//   collections.forEach((collection) => {
//     if (!product.collections.includes(collection._id)) {
//       product.collections.push(collection._id);
//     }
//     if (!collection.products.includes(product._id)) {
//       collection.products.push(product._id);
//     }
//   });

//   const brandToRemove = product.brand !== brand._id;

//   if (brandToRemove) {
//     await BrandModel.removeProduct(product.brand, product._id);
//   }

//   // Assign the brand to the product
//   product.brand = brand._id;

//   if (!brand.products.includes(product._id)) {
//     brand.products.push(product._id);
//   }

//   // Save all in parallel using Promise.all
//   await Promise.all([
//     product.save(),
//     ...collections.map((collection) => collection.save()),
//     brand.save(),
//   ]);
// };

productSchema.pre("save", async function (next) {
  let product = this;

  if (!product.isNew) {
    return next();
  }

  let originalHandle = product.handle;
  let count = 1;

  while (await product.constructor.findOne({ handle: product.handle })) {
    product.handle = `${originalHandle}-${count}`;
    count++;
  }

  next();
});

productSchema.methods.assignCollectionsAndBrand = async function (
  collections,
  brand
) {
  const product = this;

  const collectionToRemove =
    product.collections?.toString() !== collections._id?.toString();

  if (collectionToRemove) {
    await CollectionModel.removeProduct(product.collections, product._id);
  }

  const brandToRemove = product.brand?.toString() !== brand._id?.toString();

  if (brandToRemove) {
    await BrandModel.removeProduct(product.brand, product._id);
  }
  // Assign the brand to the product
  product.brand = brand._id;
  product.collections = collections._id;

  if (!brand.products.includes(product._id)) {
    brand.products.push(product._id);
  }

  if (!collections.products.includes(product._id)) {
    collections.products.push(product._id);
  }

  // Save all in parallel using Promise.all
  await Promise.all([
    product.save(),
    brand.save(),
    collections.save(),
    // ...collections.map((collection) => collection.save()),
  ]);
};

export const ProductModel = mongoose.model("Product", productSchema);
