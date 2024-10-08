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
  } = req.body;

  const isVisible = status === "ACTIVE";

  const collections = await CollectionModel.findOrCreate(candidateCollections);
  const brand = await BrandModel.findOrCreate(candidateBrand);

  const images = await handleNewImages(req.files?.images, sku);

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
    images: images,
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
    removedImages,
  } = req.body;

  const { id } = req.params;
  const isVisible = status === "ACTIVE";

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
  });

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  // Handle removed images
  if (removedImages) {
    product.images =
      (await handleRemovedImages(product.images, removedImages)) || [];
  }

  // Handle new images upload
  const newImages = await handleNewImages(req.files?.images, sku);
  if (newImages) {
    product.images.push(...newImages);
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

// utility functions

const handleRemovedImages = async (images, removedImages) => {
  if (removedImages) {
    const validRemovedImages = Array.isArray(removedImages)
      ? removedImages
      : [removedImages];

    const removedImagesObjs = images.filter((image) =>
      validRemovedImages.some(
        (removeImage) =>
          image.url === removeImage.url || image.url === removeImage
      )
    );

    const productImages = images.filter(
      (image) =>
        !validRemovedImages.some(
          (removeImage) =>
            image.url === removeImage.url || image.url === removeImage
        )
    );

    if (removedImagesObjs.length > 0) {
      await fileDeleter(removedImagesObjs);
    }

    return productImages;
  }
};

const handleNewImages = async (images, dir) => {
  if (images) {
    const uploadResults = await fileUploader(images, dir, `products/${dir}`);
    return uploadResults;
  }
};
