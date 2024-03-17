// dependencies
import { v2 as cloudinary } from "cloudinary";

//configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// export cloudinary uploader function
export const uploadToCloudinary = async (path) => {
  const uploadedFile = await cloudinary.uploader.upload(path);
  return uploadedFile;
};

// export cloudinary deleter function
export const deleteFileFromCloudinary = async (publicId) => {
  await cloudinary.uploader.destroy(publicId);
};
