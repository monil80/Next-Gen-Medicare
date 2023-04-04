require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB cloud connection SUCCESS");
  } catch (error) {
    //console.log(error)

    //--------------------------------
    try {
      mongoose.connect(process.env.Mongo_uri1, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log("MongoDB local connection SUCCESS");
    } catch (error) {
      // console.log(error)
      console.error("MongoDB  connection FAIL");
    }

    //-------------------------------
  }
};

module.exports = connectDB;
