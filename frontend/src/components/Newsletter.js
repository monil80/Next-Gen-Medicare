import React,{ useState} from "react";
import styled from "styled-components";
import axios from "axios"

import { css } from "styled-components";

const mobile = (props) => {
  return css`
    @media only screen and (max-width: 380px) {
      ${props}
    }
  `;
};



const Container = styled.div`
  height: 100px;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h3`
  font-size: 40px;
  margin-bottom: 10px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}

`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
  padding-right: 20px;
 
`;

// const Button = styled.button`
//   flex: 1;
//   border: none;
//   background-color: teal;
//   color: white;
// `;

const Newsletter = () => {

  
  const [Email, setEmail] = useState({
  
    email:"",
    error:"",
   
       
})

const handleChange = e => {
  const { name, value } = e.target
  setEmail({
      ...Email,
      [name]: value
  })
}

  const emailsubmit=e=>{
      e.preventDefault();
     
      const data = {email: Email.email}
      axios.post("http://localhost:5000/api/email", data)
      .then(res => {
          alert(res.data.msg)
         
       
        
         
      }).catch(error => {
        console.log("ERROR: ",error);
        alert("invalid email check end then submit")
    });
     
     
   


     



  }
  return (
    <Container id="email">
      <Title>News letter</Title>
      <hr className="w-50 mx-auto" />
      <Desc>Get timely updates from your favorite products.</Desc>
      <form  >
      <InputContainer>
    
        <Input  placeholder="you Email" name="email" onChange={handleChange} className="mr-5 w-10" />{''}
        <button type="button" className="btn btn-primary ml-5 " onClick={emailsubmit} >
         
       Send
        </button >
      
      </InputContainer>
      </form>
      {/* <span style={{color:"red"}} id="emailspan">plz enter valid email </span> */}
    </Container>
  );
};

export default Newsletter;
