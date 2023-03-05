import React from 'react'

import Announcement from "../components/Announcement";
// import Categories from "../components/Categories";
 import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
 import Newsletter from "../components/Newsletter";
// import Products from "../components/Products";
 import Slider1 from "../components/Slider";

 import { Slider } from "../components/hero/Slider"



function About() {
  return (
    <>
       <div className="d-grid gap-3">
     
     <div>
     <Navbar />
     </div>

     <div>
     <Announcement />
     </div>

     
    

     <div>
     <Footer/>
     </div>

         
   </div>
    </>
  )
}

export default About
