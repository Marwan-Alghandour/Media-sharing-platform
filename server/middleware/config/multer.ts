import { Request } from "express";
import multer from "multer";

type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ): void => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

export default storage;
