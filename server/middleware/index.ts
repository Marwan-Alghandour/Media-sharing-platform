import multer from "multer";
import fileFilter from "./utils/multer";
import storage from "./config/multer";
import multerErrorHandling from "./multerErrorHandling";

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 250_000_000 },
});

export default upload;

export { multerErrorHandling };
