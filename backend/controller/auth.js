const router = require("express").Router();
const User = require("../models/User");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

//REGISTEr
router.post("/register", [
  body("username", "Enter a valid name").exists().isLength({ min: 2 }),
  body("fname", "Enter a valid name").exists().isLength({ min: 2 }),
  body("lname", "Enter a valid name").exists().isLength({ min: 2 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be atleast 5 characters").isLength({ min: 5}),
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(req.body.password, salt);


      try
      {
        let user = await User.findOne({ email: req.body.email });
        //console.log(user);
        if (user) {
          return res
            .status(400)
            .json({success, error: "Sorry a user with this email already exists" });
        }
         user = await User.findOne({ username: req.body.username })
        //console.log(user);
        if (user) {
          return res
            .status(400)
            .json({success, error: "Sorry a user with this userid already exists" });
        }

        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: pass,
          lname : req.body.lname,
          fname : req.body.fname
      
        });

        const savedUser = await newUser.save();
        success=true;
        res.status(201).json({success,savedUser});
      }
      catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error in sign up");
      }
 

 
});

//LOGIN

router.post("/login", 
[
  
  body("email", "Enter a valid email").exists().isEmail(),
  body("password", "Password cannot be blank").exists(),
],

async (req, res) => {
    //console.log("login issu")
    
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let success = false;
  try {
   
    const user = await User.findOne({ email: req.body.email });
    //console.log(user)
    if (!user) {
      success = false;
      return res
        .status(400)
        .json({ success,error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(req.body.password, user.password);
    //console.log(passwordCompare)
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({
            success,
            error: "Please try to login with correct credentials",
          });
      }

     
       const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      "hi",
      {expiresIn:"1800s"}
    );
      success=true;
    const { password, ...others } = user._doc;

    res.status(200).json({...others, accessToken ,success});
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error in login");
    }
});

module.exports = router;
