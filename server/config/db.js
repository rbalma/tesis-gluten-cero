import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        mongoose.connect(process.env.MONGO_URL, {
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