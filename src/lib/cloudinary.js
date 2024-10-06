import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";

configDotenv();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

export const fileUploader = async (files, fileName, folder) => {
  const uploadResults = [];

  if (Array.isArray(files)) {
    for (const image of files) {
      try {
        const uploadResult = await cloudinary.uploader.upload(
          image.tempFilePath,
          {
            public_id: `${fileName}-image-${Date.now()}`, // Use timestamp to ensure unique public ID
            folder: folder,
          }
        );
        uploadResults.push({
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  } else {
    try {
      const uploadResult = await cloudinary.uploader.upload(
        files.tempFilePath,
        {
          public_id: `${fileName}-image-${Date.now()}`, // Use timestamp to ensure unique public ID
          folder: folder,
        }
      );
      uploadResults.push({
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  return uploadResults;
};

export const fileDeleter = async (deletedImages) => {
  if (Array.isArray(deletedImages)) {
    for (const image of deletedImages) {
      try {
        await cloudinary.uploader.destroy(image.public_id);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  } else {
    try {
      await cloudinary.uploader.destroy(deletedImages.public_id);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  }
};

export const deleteFolder = async (folderName) => {
  try {
    const result = await cloudinary.api.delete_resources_by_prefix(folderName);
  } catch (error) {
    console.error("Error deleting folder:", error);
  }
};

export { cloudinary };
