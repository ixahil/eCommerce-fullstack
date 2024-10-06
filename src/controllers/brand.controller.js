import { BrandModel } from "../models/index.js";
import { asyncHandler } from "../middlewares/index.js";
import { AppResponse } from "../utils/index.js";
import { fileUploader, fileDeleter, deleteFolder } from "../lib/cloudinary.js";

export const createBrand = asyncHandler(async (req, res, next) => {
  const { name, handle, description } = req.body;

  const brand = await BrandModel.create({
    name,
    handle,
    description,
  });

  const files = req.files?.image;

  if (files) {
    const image = await fileUploader(files, handle, `brands/${handle}`);
    brand.image = image[0];
    await brand.save();
  }
  res.status(201).json(new AppResponse(201, brand, "Brand added successfully"));
});

export const updateBrand = asyncHandler(async (req, res, next) => {
  const { name, handle, description, image: prevImage } = req.body;
  const { id } = req.params;

  // Find the brand by ID
  const brand = await BrandModel.findById(id);
  if (!brand) {
    return next(new AppError(404, "Brand not found"));
  }

  const files = req.files?.image;
  let image;

  if (files) {
    if (brand.image?.public_id) {
      await fileDeleter(brand.image);
    }
    // Upload the new image
    const uploadResults = await fileUploader(files, handle, `brands/${handle}`);
    image = uploadResults[0];
  } else {
    if (prevImage) image = brand.image;
    await fileDeleter(brand.image);
  }

  brand.name = name;
  brand.handle = handle;
  brand.description = description;
  brand.image = image;

  await brand.save();

  res
    .status(200)
    .json(new AppResponse(200, brand, "Brand updated successfully"));
});

export const deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedBrand = await BrandModel.findByIdAndDelete(id);

  if (deletedBrand) {
    await deleteFolder(`brands/${deletedBrand.handle}`);
  }

  res
    .status(200)
    .json(new AppResponse(200, null, "Brand deleted successfully"));
});

export const getBrands = asyncHandler(async (req, res, next) => {
  const brands = await BrandModel.find();
  res.status(200).json(new AppResponse(200, brands));
});

export const getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await BrandModel.findById(id);
  res.status(200).json(new AppResponse(200, brand));
});
