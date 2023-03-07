const mongoose = require("mongoose");

const EmailnewsSchema = new mongoose.Schema(
  {
  
    email: { type: String, required: true  },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Emailnews",EmailnewsSchema);
