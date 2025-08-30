const mongoose = require('mongoose');

const dbKey = process.env.MONGO_URI

const connectDB = async () => {
    try {
        await mongoose.connect(dbKey);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }
}

module.exports = connectDB;