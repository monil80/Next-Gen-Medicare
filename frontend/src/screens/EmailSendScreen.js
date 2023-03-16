import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom"
 
const EmailSend = () => {


  const nav = useHistory();
  
  const [msg,setMsg] = useState('');
  const [user, setUser] = useState({
    to: "",
    subject: "",
    description: ""
  });
 
  const { to, subject, description} = user;

  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  console.log(user)
 
  const onSubmit = async e => {
    e.preventDefault();
    const data ={to:user.to , subject :user.subject , description : user.description}
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
      };
    await axios.post("http://localhost:5000/api/email/msg",data,config)
   .then(response => {setMsg(response.data.respMesg) ; if(response.data.status){nav.push("/");}})
   .catch(rrr=>{alert("problem in mail")})


  
  };
  return (
    <div className="container">
         <h3 className="text-center text-success mb-2 mt-4">Email Send By Next-gen Medicare </h3>
         {/* <h6 className="text-secondary text-center mb-4 mt-1"></h6> */}
      <div className="row">  
      
       <div className="col-sm-4 mx-auto shadow p-5">
        <h4 className="text-center mb-2">Send E Mail </h4>
           <p className="mb-3 mt-2" style={{color:"green",marginLeft:"57px"}}><b>{msg}</b></p>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="To"
              name="to"
              onChange={onInputChange}
              value={to}
            />
          </div>
          <div className="form-group  mb-4 ">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Subject"
              name="subject"
              onChange={onInputChange}
              value={subject}
            />
          </div>
          <div className="form-group  mb-4">
            <textarea
              type="text"
              className="form-control form-control-lg"
              placeholder="Description"
              name="description"
              onChange={onInputChange}
              value={description}
            />
          </div>
          
          <button onClick={onSubmit} className="btn btn-primary btn-block " style={{marginLeft:"100px"}}>Send Mail</button>
       
      </div>
    </div>
  </div>  
  );
};
 
export default EmailSend;