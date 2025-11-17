//config/db.js
const mongoose = require('mongoose');

async function connectDB(uri) {
    try{
        await mongoose.connect(uri);
        console.log('Connected to MongoDB:', uri);
    }catch(err){
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
}

module.exports = connectDB;