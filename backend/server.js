const dotenv = require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.SECRET_KEY)
const Contact = require("./models/Contact")
const connectDB = require("./config/db");







// Initializing APP
const app = express();
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath)); 

// Midlewares
app.use(express.json());
app.use(cors())

// Database Connection
connectDB();
app.get("/",(req,res)=>{res.send("Hey There , Greetings From The Server. Have a Good Day :)")})
app.use("/api/categories", require("./controller/categories"));
app.use("/api/auth", require("./controller/auth"));
app.use("/api/users", require("./controller/user"));
app.use("/api/email", require("./controller/emailnews"));
app.use("/api/products", require("./controller/product"));
app.use("/api/email/msg", require("./controller/email"));
app.use("/api/cart",  require("./controller/cart"));







// Contacts Route
app.get("/contact", (req, res) => {
  res.json({ message: "This is the contact page" });
});

app.post("/contact", (req, res) => {
  const { fullName, email, message, city } = req.body;
  let newContact = new Contact({
    fullName, email, message, city
  })
  newContact.save();
  console.log("newContact has been saved")

});

// Stripe Integration Route
app.post("/payment", (req, res) => {
  // Getting Product details and token from the client side
  const { product, token, price } = req.body;

  console.log(`Payment of ${price} is successfully Completed !!!` );
 

  return stripe.customers.create({
    email: token.email,
    source: token.id
  }).then((customer) => {

    stripe.charges.create({
      amount: price * 100 ,
      currency: "INR",
      customer: customer.id,
      receipt_email: token.email,
      description: "Processing Payment",

    })
  }).then(result => res.status(200).json(result)).catch(err => console.log(err))

})




const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));

// Package .json 
// "start": "node server.js",
//     "start:dev": "nodemon server.js",
//     "data:import": "node backend/seederScript"

// app.use("/api/products", productRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// if(process.env.NODE_ENV === 'production'){
//   app.use(express.static(path.join(__dirname, '/frontend/build')));
//   app.get("*", (req, res)=>{
//    res.sendFile(path.join(__dirname, 'frontend',"build","index.html"));
//   })
// }else{
//   app.get("/", (req,res)=>{
//     res.send("Hey There , Greetings From The Server. Have a Good Day :)")
//   })
// }



//const productRoutes = require("./backend/routes/productRoutes");