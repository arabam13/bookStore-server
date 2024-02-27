import fs from "fs";
import path from "path";
import sharp from "sharp";

export const sharpMiddleWare = async (req, res, next) => {
  try {
    if (req.file !== undefined) {
      //resize image
      await sharp(path.join(process.cwd(), req.file.path))
        .resize({
          width: 206,
          height: 260,
          fit: "contain",
        })
        .toFile(
          path.join(process.cwd(), "images", "resized_" + req.file.filename)
        );
      //delete original image
      fs.unlinkSync(path.join(process.cwd(), req.file.path));
    }
    next();
  } catch (error) {
    console.log(`An error occurred during processing: ${error}`);
  }
};
