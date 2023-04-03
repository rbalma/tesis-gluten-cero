import mongoose from 'mongoose';
import { MONGO_ATLAS } from '../config/config.js';

const connectDB = async() => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(MONGO_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB error, ", error.message);
        process.exit(1);
    }
    
}

export default connectDB;