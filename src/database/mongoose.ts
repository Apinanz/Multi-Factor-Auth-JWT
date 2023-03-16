import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const mongoClient = async (uri: string) => {
    try {
        await mongoose.connect(uri, {
            retryWrites: true,
            w: 'majority',
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
    }
};