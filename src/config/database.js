const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://namasteDev:lvAnm2IY0lqHIzFC@namastenode.o2jsdvu.mongodb.net/devTinder");
};

module.exports = connectDB;



