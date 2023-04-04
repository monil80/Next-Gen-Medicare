const Categories = require("../models/Categories");
const router = require("express").Router();

//GET ALL PRODUCTS

router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let cat;

    if (qNew) {
      cat = await Categories.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      cat = await cat.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      cat = await Categories.find();
    }

    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post(
  "/",

  async (req, res) => {
    try {
      const { title, img, info, goto } = req.body;

      const product = new Categories({
        title,
        img,
        goto,
        info,
      });
      const savedProduct = await product.save();

      res.status(200).json(savedProduct);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
module.exports = router;
