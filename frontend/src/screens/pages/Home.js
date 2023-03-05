import React, {useState} from "react";
import { Provider } from 'react-redux';
import Announcement from "../components/Announcement";
 import Categories from "../components/Categories";
 import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
 import Newsletter from "../components/Newsletter";
 import Products from "../components/Products";
 import Slider from "../components/Slider";
 //import FlashDeals from "../components/FlashDeals";
 import FlashDeals from "../components/FlashDeals";
import FlashCard from "../components/FlashCard";

import { productItems} from '../data'
import { Order } from "../components/hero/Order"
import {Category} from "../components/category/Category";
import { Product } from "../components/product/Product"


const Home = () => {  
  const headet = {
      
   position: "relative",
    
 
}

window.addEventListener("scroll", function () {
  const header = this.document.querySelector(".header")
  header.classList.toggle("active", this.window.scrollY > 50)
})
window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })

 

 
  return (
    <div className="d-grid gap-2">
     
      <div className="header"  >
      <Navbar/>
      </div>

      <div>
      <Announcement />
      </div>

      <br />
      <div  >
      <Slider />
      </div>
      
      <div className="container h-100">
      <Order />
      </div>

      <br /><br /><br /><br /><b><b><br /><br /><br /><br /><br /></b></b>
 
      <div  className="container h-100">
      <Category />
      </div>

     

      <div>
      <Product/>
      </div>

      <div>
      <Newsletter/>
      </div>

      <div>
      <Footer/>
      </div>
     
     
     

   

    

    


      
       {/* <Categories />
      <Products/>
      <Newsletter/>
      */}
    </div>
  );
};

export default Home;
