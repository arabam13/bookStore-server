import express from "express";
import { bookController } from "../controllers/bookController.js";
import { isAuth } from "../utils/functions.js";
import { multerMiddleware } from "../utils/multer-config.js";
import { sharpMiddleWare } from "../utils/sharp-config.js";

export const bookRouter = express.Router();

bookRouter.get("/", bookController.getAllBooks);
bookRouter.get("/bestrating", bookController.bestRatingBooks);
bookRouter.get("/:id", bookController.getBook);

bookRouter.post(
  "/",
  isAuth,
  multerMiddleware,
  sharpMiddleWare,
  bookController.createBook
);
bookRouter.put(
  "/:id",
  isAuth,
  multerMiddleware,
  sharpMiddleWare,
  bookController.updateBook
);
bookRouter.delete("/:id", isAuth, bookController.deleteBook);

bookRouter.post("/:id/rating", isAuth, bookController.ratingBook);
