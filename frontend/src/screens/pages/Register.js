
import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"

import FormInput from "./FormInput"


const Register = () => {

  const navigate = useHistory();

    const [ user, setUser] = useState({
        fname: "",
        lname: "",
        username: "",
        email:"",
        password:"",
        reenterpassword: "",
        otp:"",
        error:""
        
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

  const register1 = () => {
    user.otp = ((Math.floor((Math.random()*1000000)+1))+"")
  
 const { fname, lname,username, email, password, reenterpassword   } =    user
 
         if( fname && lname && username && email && password && (password === reenterpassword)){
        axios.post("http://localhost:5000/api/auth/register", user)
        .then( res => {
            //alert(res.data.message)
            navigate.push("/")
        }).catch(e=>{console.log(e.response.data.error)
          alert(e.response.data.error)
          setUser({
            ...user,
            error: e.response.data.error
        })
        
        })
    } else {
       // console.log(process.env.REACT_APP_signup)
        //alert("invlid input111")
    }
    
}

// -------------------------------------------------------------------------------------


const inputs = [
  {
    id: 1,
    name: "fname",
    type: "text",
   
    errorMessage:
      "first name should be 2-16 characters and shouldn't include any special character!",
    label: "First Name",
    pattern: "^[A-Za-z0-9]{2,16}$",
    required: true,
  },
  {
    id: 2,
    name: "lname",
    type: "text",
    
    errorMessage:
      "last name should be 2-16 characters and shouldn't include any special character!",
    label: "Last Name",
    pattern: "^[A-Za-z0-9]{2,16}$",
    required: true,
  },
  {
    id: 3,
    name: "username",
    type: "text",
   
    errorMessage:
      "Username should be 5-16 characters and shouldn't include any special character!",
    label: "User Name",
    pattern: "^[A-Za-z0-9]{5,16}$",
    required: true,
  },
  {
    id: 4,
    name: "email",
    type: "email",
   
    errorMessage: "It should be a valid email address!",
    label: "Your Email",
    required: true,
  },
  
  {
    id: 5,
    name: "password",
    type: "password",
    
    errorMessage:
      "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
    label: "Password",
    pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    required: true,
  },
  {
    id: 6,
    name: "reenterpassword",
    type: "password",
    errorMessage: "Passwords don't match!",
    label: "Repeat your password",
    pattern: user.password,
    required: true,
  },
];

// const handleSubmit = (e) => {
//   e.preventDefault();
// };




  return (
   <>
     {/* {console.log("User", user)} */}
  
     
     <div >
     
   <section className=" bg-image"
   style={{ 
    backgroundImage: `url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp` 
  }}
 >
  
  <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card" >
            <div className="card-body p-4">
              <h2 className="text-uppercase text-center mb-4">Create an account</h2>
              <form>
               
              {inputs.map((input) => (
          <FormInput    key={input.id}  {...input}  value={user[input.name]} onchange={handleChange}   />
        ))}

                {/* <div className="form-check d-flex justify-content-center mb-4">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" required />
                  <label className="form-check-label" for="form2Example3g">
                    I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                  </label>
                </div> */}
                <div className="d-flex justify-content-center">
                  <button type="button"
                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={register1}>Register</button>
                </div>
                <br />
               <p> By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b> </p>
                <p className="text-center text-muted mt-4 mb-0">Have already an account? <a href="/login"
                    className="fw-bold text-body"><u>Login here</u></a></p>
                     <p className="text-center text-muted mt-4 mb-0">Go To Home?<a href="/"
                    className="fw-bold text-body"><u>Click here</u></a></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
   </div>

 
 
   


   </>
  );

  
};

export default Register;

//  username: req.body.username,
// email: req.body.email,
// password: pass,
// lname : req.body.lname,
// fname : req.body.fname
