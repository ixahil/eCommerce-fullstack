import { CollectionModel } from "../models/index.js";
import { asyncHandler } from "../middlewares/index.js";
import { AppResponse } from "../utils/index.js";

export const createCollection = asyncHandler(async (req, res, next) => {
  const { name, handle, description } = req.body;

  const collection = await CollectionModel.create({
    name,
    handle,
    description,
  });
  res.status(201).json(new AppResponse(201, collection));
});

export const updateCollection = asyncHandler(async (req, res, next) => {
  const { name, handle, description } = req.body;
  const { id } = req.params;

  const collection = await CollectionModel.findByIdAndUpdate(id, {
    name,
    handle,
    description,
  });
  res.status(200).json(new AppResponse(200, collection));
});

export const deleteCollection = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await CollectionModel.findByIdAndDelete(id);
  res.status(200).json(new AppResponse(200));
});

export const getCollections = asyncHandler(async (req, res, next) => {
  const collections = await CollectionModel.find();
  res.status(200).json(new AppResponse(200, collections));
});
