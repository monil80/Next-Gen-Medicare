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
app.use("/api/email", require("./controller/emailnews"));
app.use("/api/products", require("./controller/product"));
app.use("/api/email/msg", require("./controller/email"));
app.use("/api/cart",  require("./controller/cart"));
app.use("/api/payment",  require("./controller/payment"));
app.use("/api/contact",  require("./controller/contact"));













const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));

