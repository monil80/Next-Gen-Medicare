const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new mongoose.Schema(
  {
    user: {
      require: true,
      unique: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    item: [
      {
        _id: { type: String },
        product: { type: String },
        title: { type: String },
        imgsrc: { type: String },
        price: { type: String },
        CountInStock: { type: String },
        qty: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
