import { BrandModel } from "../models/index.js";
import { asyncHandler } from "../middlewares/index.js";
import { AppResponse } from "../utils/index.js";

export const createBrand = asyncHandler(async (req, res, next) => {
  const { name, handle, description } = req.body;

  const collection = await BrandModel.create({
    name,
    handle,
    description,
  });
  res.status(201).json(new AppResponse(201, collection));
});

export const updateBrand = asyncHandler(async (req, res, next) => {
  const { name, handle, description } = req.body;
  const { id } = req.params;

  const collection = await BrandModel.findByIdAndUpdate(id, {
    name,
    handle,
    description,
  });
  res.status(200).json(new AppResponse(200, collection));
});

export const deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await BrandModel.findByIdAndDelete(id);
  res.status(200).json(new AppResponse(200));
});

export const getBrands = asyncHandler(async (req, res, next) => {
  const brands = await BrandModel.find();
  res.status(200).json(new AppResponse(200, brands));
});
