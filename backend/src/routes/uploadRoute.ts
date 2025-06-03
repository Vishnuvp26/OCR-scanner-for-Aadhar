import { Router } from "express";
import { createDependencies } from "../container/containter";
import upload from "../middleware/multer";

const router = Router();

const { ocrController } = createDependencies();

router.post(
    '/upload',
    upload,
    ocrController.uploadImage.bind(ocrController)
)

export default router