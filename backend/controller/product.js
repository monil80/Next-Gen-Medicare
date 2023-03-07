const Product = require("../models/Product");
const router = require("express").Router();

const getProducts = async (req, res) => {
  try {
   // console.log("hi")
    const products = await Product.find({});
    res.json(products);
   // console.log(products)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

router.get("/", getProducts);
router.get("/:id", getProductById);


module.exports = router;