import { v2 as cloudinary } from "cloudinary";

export const uploadToCloudinary: any = async (file: any) => {
  cloudinary.config({
    cloud_name: "dsbgpj3iu",
    api_key: "283781311859692",
    api_secret: "_8kg303rVcVoDO2BF-r7QGi8XXM",
  });

  const uploadResult = await cloudinary.uploader
    .upload(file.path, {
      public_id: file.originalname,
    })
    .catch((error) => {
      console.log(error);
    });

  return uploadResult;
};
