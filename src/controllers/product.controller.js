import { BrandModel, CollectionModel, ProductModel } from "../models/index.js";
import { asyncHandler } from "../middlewares/index.js";
import { AppError, AppResponse } from "../utils/index.js";
import { cloudinary } from "../lib/index.js";

export const createProduct = asyncHandler(async (req, res, next) => {
  const {
    sku,
    collections: candidateCollections,
    description,
    name,
    brand: candidateBrand,
    price,
    salPrice,
    stock,
    isFreeShipping,
    isFeatured,
    isVisible,
  } = req.body;

  const image = req.files?.images[0];

  const product = await ProductModel.create({
    sku,
    name,
    price,
    salePrice,
    description,
    stock,
    isFreeShipping,
    isFeatured,
    isVisible,
  });

  if (image) {
    const uploadResult = await cloudinary.uploader
      .upload(image.tempFilePath, {
        public_id: `${sku}-image`,
        folder: `products/${sku}`,
      })
      .catch((error) => {
        console.log(error);
      });

    product.thumbnail = {
      public_id: uploadResult.public_id,
      url: uploadResult.secure_url,
    };
  }

  // Use statics for collection and brand
  const collections = await CollectionModel.findOrCreate(candidateCollections);
  const brand = await BrandModel.findOrCreate(candidateBrand);

  // Assign collections and brand to product also add product in collection and brand
  await product.assignCollectionsAndBrand(collections, brand);

  res.status(201).json(new AppResponse(201, { product, collections, brand }));
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const {
    sku,
    collections: candidateCollections,
    description,
    name,
    salePrice,
    brand: candidateBrand,
    price,
    stock,
    isFreeShipping,
    isFeatured,
    isVisible,
  } = req.body;

  const { id } = req.params;

  const product = await ProductModel.findByIdAndUpdate(id, {
    sku,
    name,
    price,
    salePrice,
    description,
    stock,
    isFreeShipping,
    isFeatured,
    isVisible,
  });

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  // Use statics for collection and brand
  const collections = await CollectionModel.findOrCreate(candidateCollections);
  const brand = await BrandModel.findOrCreate(candidateBrand);

  // Assign collections and brand to product also add product in collection and brand
  await product.assignCollectionsAndBrand(collections, brand);

  res.status(201).json(new AppResponse(201, { product, collections, brand }));
});

export const getProducts = asyncHandler(async (req, res, next) => {
  const products = await ProductModel.find()
    .populate("brand")
    .populate("collections");
  res.status(200).json(new AppResponse(200, products));
});

export const getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const products = await ProductModel.findById(id)
    .populate("brand")
    .populate("collections");
  res.status(200).json(new AppResponse(200, products));
});
