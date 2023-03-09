import React, {useEffect,useState} from 'react';
//import allProductsData from "../Data/allProductsData";
import Card from "../components/Card";
import { publicRequest } from '../requestMethods';


function AllProductsScreen() {

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
        <div className="homescreen">
            <div className="container text-center">
                <h1 className="mt-3">Products</h1>
                <hr className="w-25 mx-auto" />
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
    )
}

export default AllProductsScreen;


// key={index}
// imgsrc={val.imgsrc}
// title={val.title}
// info={val.info}
// link={val.link}