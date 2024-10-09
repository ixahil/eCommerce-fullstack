import { AppResponse } from "../utils/index.js";
import { asyncHandler } from "../middlewares/index.js";
import { NavigationMenuModel } from "../models/index.js";

export const createMenu = asyncHandler(async (req, res, next) => {
  const { name, handle, menu } = req.body;
  const NavMenu = await NavigationMenuModel.create({ name, handle, menu });
  res
    .status(201)
    .json(new AppResponse(201, NavMenu, "Menu added successfully"));
});

export const getMenus = asyncHandler(async (req, res, next) => {
  const NavMenus = await NavigationMenuModel.find();
  res.status(200).json(new AppResponse(200, NavMenus));
});

export const getMenuById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const NavMenus = await NavigationMenuModel.findById(id);
  res.status(200).json(new AppResponse(200, NavMenus));
});
