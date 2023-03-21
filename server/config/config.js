import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 5000;
export const MONGO_URL = process.env.MONGO_URL;
export const MONGO_ATLAS = process.env.MONGO_ATLAS;
export const MONGO_COMPASS = process.env.MONGO_COMPASS;

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_SECRET_ID = process.env.GOOGLE_SECRET_ID;

export const JWT_SECRET = process.env.JWT_SECRET;

export const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

export const URL_FRONT = process.env.URL_FRONT;