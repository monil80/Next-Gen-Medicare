require("dotenv").config();

const productData = require("./data/products");
const categoriesData = require("./data/categories")
const connectDB = require("./config/db");
const Product = require("./models/Product");
const cetegories1 = require("./models/Categories")
const multer = require("multer");
const upload = multer({dest:"uploads/"})

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(productData);

    //await cetegories1.deleteMany({});
    await cetegories1.insertMany(categoriesData);
    console.log("Data Import Success");

    process.exit();
  } catch (error) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

importData();
