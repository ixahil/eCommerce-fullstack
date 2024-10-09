import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import { errorHandler } from "./middlewares/index.js";
import {
  authRouter,
  brandRouter,
  collectionRouter,
  productRouter,
  userRouter,
  menuRouter,
  siteConfigRouter,
} from "./routes/index.js";
import fileUpload from "express-fileupload";
import { swaggerSpec } from "./swagger.js";
import swaggerUi from "swagger-ui-express";
import user2Router from "./routes/users.js";
import path from "path";
import cors from "cors";

const __dirname = import.meta.dirname;

export const app = express();

app.use(cors());
app.use("/static", express.static(path.join(__dirname, "..", "public")));
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/users", user2Router);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/collections", collectionRouter);
app.use("/api/v1/store", menuRouter, siteConfigRouter);

app.use(errorHandler);
