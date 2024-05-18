// lib/mongodb.js

import mongoose from 'mongoose';

let isConnected = false;

export const connectMongoDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw new Error("Failed to connect to MongoDB");
    }
};
