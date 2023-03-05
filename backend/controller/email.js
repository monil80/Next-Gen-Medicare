const nodemailer = require('nodemailer');
const router = require("express").Router();


//CREATE

router.post("/",  async (req,res)=>{

  //let testAccount = await nodemailer.createTestAccount();
  console.log(process.env.emailuser)
 
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {
        user: process.env.emailuser,
        pass: process.env.emailpass
      }})

  var mailOptions = {
      from: process.env.emailuser,// sender address
      to: req.body.to, // list of receivers
      subject: req.body.subject, // Subject line
      text:req.body.description,
      html: `
      <div style="padding:10px;border-style: ridge">
      <p>You have a new announcemeny from the nex-tgen-medicare</p>
      <h3>Details</h3>
      <ul>
          <li>Email: ${req.body.to}</li>
          <li>Subject: ${req.body.subject}</li>
          <li>Message: ${req.body.description}</li>
      </ul>
      `
  };

  transporter.sendMail(mailOptions, function(error, info){
      if (error)
      {
        res.json({status: false, respMesg: 'Email not Sent Successfully' , error : error})
      } 
      else
      {
        res.json({status: true, respMesg: 'Email Sent Successfully'})
      }
   
    });

  
});
 

 

module.exports = router;