const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY } = process.env;
const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME, 
  api_key: CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_API_SECRET,
  secure: true
})


exports.uploadImage = async (filePath, folderName) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: folderName
  })
}

exports.deleteImage = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId)
}