const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    info: { type: String, required: true },
    goto: { type: String, required: true },
  },
  { timestamps: true }
);
const Categories = mongoose.model("categories", CategoriesSchema);

module.exports = Categories;
