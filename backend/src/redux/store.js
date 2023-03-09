import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
//import React,{useState,useEffect} from "react";
//import {  useDispatch } from "react-redux";
//import { getcart} from "../../redux/actions/cartActions";





// Reducers
import { cartReducer } from "./reducers/cartReducers";
import {
  getProductsReducer,
  getProductDetailsReducer,
} from "./reducers/productReducers";
//import axios from "axios";

const reducer = combineReducers({
  cart: cartReducer,
  getProducts: getProductsReducer,
  getProductDetails: getProductDetailsReducer,
});

const middleware = [thunk]; 


// if(localStorage.getItem("auth-token-id"))
// {
//   cartItemsInLocalStorage =localStorage.getItem("cart")
//   ? JSON.parse(localStorage.getItem("cart"))
//   : [];
// }
// else
// {
//   cartItemsInLocalStorage=[]
// }
  // cartItemsInLocalStorage =localStorage.getItem("cart")
  //  ? JSON.parse(localStorage.getItem("cart"))
  //  : [];
  
 let cartItemsInLocalStorage =localStorage.getItem("cart")
     ? JSON.parse(localStorage.getItem("cart"))
     : [];
//let cartItemsInLocalStorage=[]


const INITIAL_STATE = {
  cart: {
    cartItems: cartItemsInLocalStorage,
  },
};

const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
