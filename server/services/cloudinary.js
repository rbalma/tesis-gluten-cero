import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY } from '../config/config.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME, 
  api_key: CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_API_SECRET,
  secure: true
})


export const uploadImage = async (filePath, folderName) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: folderName
  })
}

export const deleteImage = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId)
}