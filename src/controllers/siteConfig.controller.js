import { StoreConfigModel } from "../models/index.js";
import { asyncHandler } from "../middlewares/index.js";
import { AppResponse } from "../utils/index.js";

export const updateSiteConfig = asyncHandler(async (req, res, next) => {
  const siteConfig = await StoreConfigModel.findOne({ name: "Store" });

  if (!siteConfig) {
    return next(new Error("No site config found"));
  }

  siteConfig.mainMenu = req.body?.mainMenu;
  siteConfig.footerMenu = req.body?.footerMenu;

  await siteConfig.save();

  res.status(200).json(new AppResponse(200, siteConfig));
});

export const getSiteConfig = asyncHandler(async (req, res, next) => {
  const siteConfig = await StoreConfigModel.findOne({ name: "Store" })
    .populate("mainMenu")
    .populate("footerMenu");

  if (!siteConfig) {
    return next(new Error("No site config found"));
  }

  res.status(200).json(new AppResponse(200, siteConfig));
});
