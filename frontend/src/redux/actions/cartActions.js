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
  };

  axios
    .post("http://localhost:5000/api/cart/", send)
    .then((res) => {})
    .catch((e) => {
      console.log(e.response.data.error);
    });
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });

  let send = {
    user: localStorage.getItem("auth-token-id"),
    product: id,
  };
  axios
    .post("http://localhost:5000/api/cart/delete", send)
    .then((res) => {})
    .catch((e) => {
      console.log(e.response.data.error);
    });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const getcart = () => async (dispatch, getState) => {
  try {
    const data1 = await axios.post("http://localhost:5000/api/cart/get", {
      user: localStorage.getItem("auth-token-id"),
    });

    dispatch({ type: actionTypes.GET_TO_CART, payload: data1.data });
  } catch (error) {
    console.log(error);
  }

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const emptycart = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.LOGOUT_TO_CART, payload: [] });
};
