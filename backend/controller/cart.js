const Cart = require("../models/Cart");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  try {
    let success = false;
    // console.log(req.body)
    let userid = req.body.user;
    let item1 = {
      _id: req.body.product,
      product: req.body.product,
      title: req.body.title,
      imgsrc: req.body.imgsrc,
      price: req.body.price,
      CountInStock: req.body.countInStock,
      qty: req.body.qty,
    };

    let user = await Cart.findOne({ user: req.body.user });
    if (user) {
      const id1 = user._id;
      // console.log(id1)
      // console.log("one deep")

      // res.status(200).json("user present in cart");
      user = await Cart.findOne({ item: { $elemMatch: { _id: item1._id } } });
      if (user) {
        // console.log("one deep1")

        Cart.updateOne(
          { "item._id": item1._id },
          {
            $set: {
              "item.$.qty": item1.qty,
            },
          },
          function (err, model) {
            if (err) {
              console.log(err);
              // return res.send(err);
            }
            // console.log("user updated");
          }
        );
      } else {
        //console.log("one deep2")
        Cart.updateOne(
          { _id: id1 },
          { $push: { item: item1 } },
          { upsert: true },
          function (err) {
            if (err) {
              console.log(err);
            } else {
              // console.log("Successfully added");
            }
          }
        );
      }
    } else {
      success = true;

      // console.log(item1)

      const cart = new Cart({
        item: item1,
        user: userid,
      });
      const savecart = await cart.save();

      res.status(200).json({ success, savecart });
    }
    res.status(200).json("end");
  } catch (error) {
    console.log(error);
  }
});

//DELETE
router.post("/delete", async (req, res) => {
  try {
    let user = await Cart.findOne({ user: req.body.user });
    if (user) {
      // console.log( user.item)
      user.item.pull({ _id: req.body.product }); // removed
      // console.log( user.item)
      const savecart = await user.save();

      res.status(200).json({ savecart });
    }

    
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.post("/get", async (req, res) => {
  
  try {
    const cart = await Cart.findOne({ user: req.body.user });
    res.json(cart.item);
  } catch (err) {
    //console.log(err)
    res.status(400).json(err);
  }
});

module.exports = router;
