import React, { useState } from 'react'
//import { useHistory} from "react-router-dom"
import axios from 'axios';

function ContactScreen() {

    //const navigate = useHistory();


    const [data, setData] = useState({
        fullName: "",
        email: "",
        // gender: "",
        message: "",
        city: "",
    });

    const InputEvent = (event) => {
        const { name, value } = event.target;
        setData((preVal) => {
            return {
                ...preVal,
                [name]: value,
            };
        });
    };

    const formSubmit = (e) => {
         e.preventDefault();


         axios.post("http://localhost:5000/api/contact", data)
         .then(res => {

            setData((preVal) => {
                return {
                    ...preVal,
                    fullName: "",
                    email: "",
                     gender: "",
                    message: "",
                    city: "",
                };
            });
             
              alert(
                 `Your Full Name is ${data.fullName}. Your Email address ${data.email} ,Your Gender is ${data.gender}, Your City is ${data.city} ,Your message is ${data.message}. Thank For Your Response`
             );  
            
          
           
            
         }).catch(error => {
           console.log("ERROR: ",error);})
       
    };

    const PostData = async (e) => {
      
       
        // const { fullName, email, message, city } = data;
        // const response = await fetch("http://localhost:5000/api/contact", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         fullName, email, message, city
        //     })
        // });

        // const _data = await response.json();
        // if(!_data.status === 422) {
        //     console.log("Error")
        // }else {
        //     console.log("registration")
            
        // }

       
      
        
    }

  
    return (
        <div>
            <section className="main_heading pt-5">
                <div className="text-center">
                    <h1 className="display-4">Contact Us</h1>
                    <hr className="w-25 mx-auto" />
                </div>
                <div className="container my-5">
                    <div className="row">
                        <div className="col-xxl-8 col-10 col-md-8 mx-auto">
                            <form onSubmit={formSubmit} method="POST">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputtext1"
                                        className="form-label">Name</label>
                                    <input type="text"
                                        className="form-control"
                                        id="exampleInputtext1"
                                        name="fullName"
                                        value={data.fullName}
                                        onChange={InputEvent}
                                        placeholder="Enter Your Name"
                                        required={true} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        name="email"
                                        value={data.email}
                                        onChange={InputEvent}
                                        placeholder="name@example.com"
                                      
                                        required={true}/>
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label className="pr-4" style={{marginRight:"10px"}}>Gender</label>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input"
                                            type="radio" name="gender"
                                            id="inlineRadio1"
                                            value={data.gender}
                                            onChange={InputEvent}
                                            required={true} />
                                        <label className="form-check-label" htmlFor="inlineRadio1">Female</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" id="inlineRadio2"
                                            value={data.gender}
                                            onChange={InputEvent}
                                            required={true} />
                                        <label className="form-check-label" htmlFor="inlineRadio2">Male</label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleDataList"
                                        className="form-label">City</label>
                                    <input
                                        className="form-control"
                                        list="datalistOptions"
                                        id="exampleDataList"
                                        type="text"
                                        name="city"
                                        value={data.city}
                                        onChange={InputEvent}
                                        placeholder="Type to search..."
                                        required={true} />
                                    <datalist id="datalistOptions">
                                        <option value="Pune"></option>
                                        <option value="Hydrabad"></option>
                                        <option value="Indore"></option>
                                        <option value="Mumbai"></option>
                                        <option value="Bengaluru"></option>
                                        <option value="Bhubaneswar"></option>
                                    </datalist>
                                </div>
                                <div>

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Message</label>
                                    <textarea className="form-control"
                                        id="exampleFormControlTextarea1"
                                        required={true}
                                        rows="3"
                                        name="message"
                                        value={data.message}
                                        onChange={InputEvent}
                                    ></textarea>
                                </div>
                                <button type="submit" onClick={PostData} className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ContactScreen
