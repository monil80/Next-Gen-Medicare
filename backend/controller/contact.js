const router = require("express").Router();

const Contact = require("../models/Contact");

// Contacts Route
router.get("/", (req, res) => {
    res.json({ message: "This is the contact page" });
  });


  
  router.post("/", (req, res) => {
   // console.log(req.body)
    const { fullName, email, message, city } = req.body;
    let newContact = new Contact({
      fullName, email, message, city
    })
    newContact.save();
   // console.log("newContact has been saved")

    res.json("contect detail submit")
  
  });
  
  // Stripe Integration Route


module.exports = router;

