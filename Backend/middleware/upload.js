import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "cake-shop",
    allowed_formats: ["jpg","png","jpeg","webp"],
    public_id: Date.now() + "-" + file.originalname
  }),
});

export const upload = multer({ storage });