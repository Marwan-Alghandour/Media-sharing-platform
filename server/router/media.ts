import { Router } from "express";
import upload, { multerErrorHandling } from "../middleware";
import {
  uploadMedia,
  getMedia,
  likeMedia,
} from "../controller/MediaController";

const router = Router();

router.post(
  "/upload",
  upload.array("upload"),
  uploadMedia,
  multerErrorHandling
);
router.get("/", getMedia);
router.put("/like/:id", likeMedia);

export default router;
