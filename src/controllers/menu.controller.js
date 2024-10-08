import { asyncHandler } from "../middlewares/index.js";
import { NavigationMenuModel } from "../models/index.js";

export const createMenu = asyncHandler(async (req, res, next) => {
  const { name, handle, menu } = req.body;
  const NavMenu = await NavigationMenuModel.create({ name, handle, menu });
  res
    .status(201)
    .json(new AppResponse(201, NavMenu, "Menu added successfully"));
});
