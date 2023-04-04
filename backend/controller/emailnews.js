const router = require("express").Router();
const Emailnews = require("../models/Emailnews");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

//REGISTEr
router.post(
  "/",
  [body("email", "Enter a valid email").isEmail()],
  async (req, res) => {
    //console.log(req.body)

    let success = false;
    const errors = validationResult(req);
    //console.log(errors)
    //console.log(!errors.isEmpty())

    if (!errors.isEmpty()) {
      return (
        res
          //  .status(400)
          .json({ success, msg: "plz provide valid email address" })
      );
    }

    //console.log("hi")

    try {
      let user = await Emailnews.findOne({ email: req.body.email });
      //console.log(user);
      if (user) {
        return (
          res
            //  .status(400)
            .json({
              success,
              msg: "Sorry a user with this email already exists",
            })
        );
      }

      const newUser = new Emailnews({
        email: req.body.email,
      });

      const savedUser = await newUser.save();
      success = true;
      res
        .status(201)
        .json({ success, msg: " email register for news-letters" });
    } catch (error) {
      //console.error(error.message);
      res.status(500).send("Internal Server Error in email news-letters");
    }
  }
);

module.exports = router;
