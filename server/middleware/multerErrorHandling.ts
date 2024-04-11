import { Request, Response, NextFunction } from "express";
import { MulterError } from "multer";
import MediaTypeError from "../exceptions/MediaTypeError";

const handleMulterError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json("File size limit exceeded");
    }
    return res.status(400).json(err.message);
  } else if (err instanceof MediaTypeError) {
    return res.status(400).json(err.message);
  } else {
    return res.status(500).json("An unknown error occurred");
  }
};

export default handleMulterError;
