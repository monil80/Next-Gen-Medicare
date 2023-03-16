import React, {useEffect,useState}from 'react';
import "../styles/MainScreen.css";
//import allProductsData from "../Data/allProductsData";
import Card from "../components/Card";
//import axios from "axios";
import { publicRequest } from '../requestMethods';

import Newsletter from "../components/Newsletter"



function MainScreen() {

        const [categories, setCategories] = useState([]);


  useEffect(() => {
    const getcategories = async () => {
      try {
        const res = await publicRequest.get("http://localhost:5000/api/categories");
        setCategories(res.data);
      } catch (err) {}
    };
    getcategories();
   }, []);


    return (
        <div>
            <div className="container text-center ">
                <h1 className="mt-3 "> Online Medicine Store</h1>
                <hr className="w-50 mx-auto" />
            </div>

            <div className="container mt-4" >
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://images.pexels.com/photos/3850684/pexels-photo-3850684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.pexels.com/photos/208541/pexels-photo-208541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.pexels.com/photos/3786124/pexels-photo-3786124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                        data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                        data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className="homescreen" style={{marginTop:"50px"}}>
                <div className="container text-center ">
                    <h1 className="mt-3 ">Explore By</h1>
                    <hr className="w-50 mx-auto" />
                </div>

                <div className="homescreen__products">
                    {categories.map((val) => {
                    
                        return (
                         
                            <Card
                                key={val._id}
                                imgsrc={val.img}
                                title={val.title}
                                info={val.info}
                                link={val.goto}
                                id={val._id}

                            />
                        )

                    })}

                </div>
            </div>
            <br /><br />

            <Newsletter/>

        </div>
    )
}

export default MainScreen
