import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import { Messages } from "../constants/messages";

const storage = multer.memoryStorage();

const fileFilter: (req: Request,file: Express.Multer.File,cb: FileFilterCallback) => void = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error(Messages.INVALID_FILE) as any, false);
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter,
}).fields([
    { name: "front", maxCount: 1 },
    { name: "back", maxCount: 1 },
]);

export default upload;