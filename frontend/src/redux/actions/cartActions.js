import * as actionTypes from "../constants/cartConstants";
import axios from "axios";



export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);

  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product: data._id,
      title: data.title,
      imgsrc: data.imgsrc,
      price: data.price,
      CountInStock: data.countInStock,
      qty,
    },
  });



  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));



  let send = {
    user: localStorage.getItem("auth-token-id"),
    product: data._id,
    title: data.title,
    imgsrc: data.imgsrc,
    price: data.price,
    countInStock: data.countInStock,
    qty,
  }




  axios.post("http://localhost:5000/api/cart/", send)
    .then(res => {
      // console.log(send)
      //alert(res.data.message)
      // navigate.push("/")
    }).catch(e => {
      console.log(e.response.data.error)
      // alert(e.response.data.error)

    })








  //    .then( res => {
  //     console.log(res)
  //     cartItemsInLocalStorage=res.data
  //       //alert(res.data.message)
  //      // navigate.push("/")
  //   }).catch(e=>{
  //     console.log(e)
  //    // alert(e.response.data.error)

  //   }) 
  //   console.log(cartItemsInLocalStorage)
  //  if(cartItemsInLocalStorage===null)
  //  {
  //   console.log("empty")
  //  }
  //  else
  //  {

  //  }





};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });





  let send = {
    user: localStorage.getItem("auth-token-id"),
    product: id,

  }
  axios.post("http://localhost:5000/api/cart/delete", send)
    .then(res => {
      //console.log(res)
      //alert(res.data.message)
      // navigate.push("/")
    }).catch(e => {
      console.log(e.response.data.error)
      // alert(e.response.data.error)

    })



  //console.log("local set")
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));

};

export const getcart = () => async (dispatch, getState) => {
  try {


    const data1 = await axios.post("http://localhost:5000/api/cart/get",
      { user: localStorage.getItem("auth-token-id") });
    // console.log(data1)
    // console.log(data1.data)
    dispatch({ type: actionTypes.GET_TO_CART, payload: data1.data });

    console.log(data1.data)


    //console.log(data)

    // dispatch({
    //   type: actionTypes.GET_TO_CART,
    //   payload: data.data,
    // });
  } catch (error) {
    // dispatch({
    //   type: actionTypes.GET_PRODUCTS_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
    console.log(error)
  }

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
