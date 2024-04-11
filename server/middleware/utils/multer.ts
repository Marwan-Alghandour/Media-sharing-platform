import { Request } from "express";
import MediaTypeError from "../../exceptions/MediaTypeError";

type FileFilterCallback = (error: Error | null, flag?: boolean) => void;

export const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "image/gif" ||
    file.mimetype === "video/mp4"
  ) {
    callback(null, true);
  } else {
    callback(new MediaTypeError("Please stick to the defined types"));
  }
};

export default fileFilter;
