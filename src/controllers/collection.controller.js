import { CollectionModel } from "../models/index.js";
import { asyncHandler } from "../middlewares/index.js";
import { AppResponse } from "../utils/index.js";
import { deleteFolder, fileDeleter, fileUploader } from "../lib/cloudinary.js";

export const createCollection = asyncHandler(async (req, res, next) => {
  const { name, handle, description, status } = req.body;

  const collection = await CollectionModel.create({
    name,
    handle,
    description,
    status,
  });

  const files = req.files?.image;

  if (files) {
    const image = await fileUploader(files, handle, `collections/${handle}`);
    collection.image = image[0];
    await collection.save();
  }

  res
    .status(201)
    .json(new AppResponse(201, collection, "Collection Added Successfully"));
});

export const getCollection = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const collection = await CollectionModel.findById(id);
  if (!collection) {
    return res.status(404).json(new AppResponse(404, "Collection not found"));
  }

  res.status(200).json(new AppResponse(200, collection));
});

export const updateCollection = asyncHandler(async (req, res, next) => {
  const { name, handle, description, status, image: prevImage } = req.body;
  const { id } = req.params;

  // Find the brand by ID
  const collection = await CollectionModel.findById(id);
  if (!collection) {
    return next(new AppError(404, "Collection not found"));
  }

  const files = req.files?.image;

  let image;

  if (files) {
    if (collection.image?.public_id) {
      await fileDeleter(collection.image);
    }
    image = await fileUploader(files, handle, `collections/${handle}`);
  } else if (prevImage) {
    image = collection.image;
  } else {
    await fileDeleter(collection.image);
  }

  collection.name = name;
  collection.handle = handle;
  collection.description = description;
  collection.image = image;

  await collection.save();

  res
    .status(200)
    .json(new AppResponse(200, collection, "Collection Updated Successfully"));
});

export const deleteCollection = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedCollection = await CollectionModel.findByIdAndDelete(id);
  if (!deletedCollection) {
    return res.status(404).json(new AppResponse(404, "Collection not found"));
  }

  if (deletedCollection) {
    await deleteFolder(`collections/${deletedCollection.handle}`);
  }

  res
    .status(200)
    .json(new AppResponse(200, null, "Collection deleted successfully"));
});

export const getCollections = asyncHandler(async (req, res, next) => {
  const collections = await CollectionModel.find();
  res.status(200).json(new AppResponse(200, collections));
});
