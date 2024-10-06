import { BrandModel, CollectionModel, ProductModel } from "../models/index.js";
import { asyncHandler } from "../middlewares/index.js";
import { AppError, AppResponse } from "../utils/index.js";
import { fileDeleter, fileUploader } from "../lib/cloudinary.js";

export const createProduct = asyncHandler(async (req, res, next) => {
  const {
    sku,
    collections: candidateCollections,
    description,
    name,
    brand: candidateBrand,
    price,
    salePrice,
    status,
    handle,
    stock,
    isFreeShipping,
    isFeatured,
    isVisible,
  } = req.body;

  const images = req.files?.images;

  const collections = await CollectionModel.findOrCreate(candidateCollections);
  const brand = await BrandModel.findOrCreate(candidateBrand);

  let uploadResults = [];

  if (images) {
    uploadResults = await fileUploader(images, sku, `products/${sku}`);
  }

  const product = await ProductModel.create({
    sku,
    name,
    price,
    salePrice,
    description,
    handle,
    stock,
    isFreeShipping,
    isFeatured,
    status,
    isVisible,
    images: uploadResults,
  });

  // Assign collections and brand to product also add product in collection and brand
  await product.assignCollectionsAndBrand(collections, brand);

  res
    .status(201)
    .json(
      new AppResponse(
        201,
        { product, collections, brand },
        "Product Added Successfully"
      )
    );
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const {
    sku,
    collections: candidateCollections,
    description,
    name,
    salePrice,
    handle,
    status,
    brand: candidateBrand,
    price,
    stock,
    isFreeShipping,
    isFeatured,
    isVisible,
  } = req.body;

  const { id } = req.params;

  const prevImages = req.body?.prevImages
    ? JSON.parse(req.body.prevImages)
    : [];

  const product = await ProductModel.findByIdAndUpdate(id, {
    sku,
    name,
    price,
    salePrice,
    handle,
    description,
    stock,
    isFreeShipping,
    isFeatured,
    isVisible,
    status,
    images: prevImages,
  }); // Option to return the updated product

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  const deletedImages = product.images.filter(
    (img) =>
      !prevImages.some(
        (prevImg) => prevImg._id.toString() === img._id.toString()
      )
  );

  if (deletedImages.length > 0) {
    await fileDeleter(deletedImages);
  }

  const images = req.files?.images;
  if (images) {
    const uploadResults = await fileUploader(images, sku, `products/${sku}`);
    product.images = [...product.images, ...uploadResults];
  }

  // Use statics for collection and brand
  const collections = await CollectionModel.findOrCreate(candidateCollections);
  const brand = await BrandModel.findOrCreate(candidateBrand);

  // Assign collections and brand to product also add product in collection and brand
  await product.assignCollectionsAndBrand(collections, brand);

  res
    .status(200)
    .json(
      new AppResponse(
        200,
        { product, collections, brand },
        "Product updated successfully"
      )
    );
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

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const products = await ProductModel.findByIdAndDelete(id);

  res
    .status(200)
    .json(new AppResponse(200, null, "Product Deleted Successfully"));
});
