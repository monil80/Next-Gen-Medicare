import React from 'react'
//import allProductsData from "../Data/allProductsData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";



// Components
import Product from "../components/Product";

//Actions
import { getProducts as listProducts } from "../redux/actions/productActions";

function StaticScreen() {

  const location = useLocation();
  let categories = location.pathname.split("/")[2];
  categories= categories.charAt(0).toUpperCase() + categories.slice(1);
  //console.log(categories)

  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;
  useEffect(() => {
  dispatch(listProducts());

  }, [dispatch]);

  return (
    <div>
      <div className="homescreen">
        <div className="container text-center">
          <h1 className="mt-3">{categories}</h1>
          <hr className="w-25 mx-auto" />
        </div>
        <div className="homescreen__products">
          {loading ? (
            <h2>Loading...</h2>
          ) : error ? (
            <h2>{error}</h2>
          ) : (
            products.map((product) => product.category === categories && (
              <Product
                key={product._id}
                imgsrc={product.imgsrc}
                title={product.title}
                indication={product.indication.length > 100 ? product.indication.slice(0, 100) + "..." : product.indication}
                dosage={product.dosage.length > 50 ? product.dosage.slice(0, 50) + "..." : product.dosage}
                sideEffects={product.sideEffects.length > 50 ? product.sideEffects.slice(0, 50) + "..." : product.sideEffects}
                price={product.price}
                productId={product._id}
              />
            )
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default StaticScreen
