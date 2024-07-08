const mongoose = require("mongoose");

//const URI = "mongodb+srv://mahiraakhter950:CBOETgA48eL5TQEi@cluster0.dmitore.mongodb.net/mern_admin";
const URI = process.env.MONGODB_URI;
//mongoose.connect(URI);

const connectDb = async ()=>{
    try {
        await mongoose.connect(URI);
        console.log("connection successful");
      
    } catch (error) {
        console.error("connection failed");
        process.exit(0);
    }
}

module.exports = connectDb;

