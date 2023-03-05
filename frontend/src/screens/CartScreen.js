import "../styles/CartScreen.css";
import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
//import axios from "axios";

//import {getcart as list} from "../redux/actions/cartActions"

// Components
import CartItem from "../components/CartItem";

// Actions
import { addToCart, removeFromCart, getcart } from "../redux/actions/cartActions";


const CartScreen = () => {
  const dispatch = useDispatch();

  // const [bcart, setBcart] = useState([]);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => { }, []);

  // const getcart1 = useSelector((state) => state.getcart);
  // const { cat } =getcart1
  //  useEffect(() => {
  //   dispatch(list());
  //   }, [dispatch]);
  useEffect(() => {
    function getcardata() {
      dispatch(getcart());
    }
    // const getcardata = () => {
    //   dispatch(getcart());
    // };
    getcardata();
   
  }, []);



  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  // Removing selected item from the cart
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // To get the total items present in the cart
  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };
  // Getting the total Price 
  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };


  // Make Payment
  const makePayment = token => {
    const body = {
      token,
      product: cartItems,
      price: getCartSubTotal()

    }
    const headers = {
      "content-type": "application/json"
    }

    return fetch(`http://localhost:5000/payment`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log("RESPONSE", response)
      const { status } = response
      console.log("status", status)

      // Empty The cart after Succcesfull Payment
      cartItems.forEach(item => dispatch(removeFromCart(item.product)))
    }).catch(error => {
      console.log("ERROR", error)
    })

  }


  return (
    <>
      {/* {getcardata()} */}



      <div className="cartscreen" style={{ marginBottom: "460px" }}>
        <div className="cartscreen__left">
          <h2>Shopping Cart</h2>



          {cartItems.length === 0 ? (
            <div>
              Your Cart Is Empty <Link to="/">Go Back</Link>
            </div>

          ) : (
            cartItems.map((item) => (

              <CartItem
                key={item.product}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeFromCartHandler}
              />
            ))
          )}
        </div>

        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>TOTAL(INR) : ₹{getCartSubTotal()} </p>
            <p>TOTAL(USD) : ${getCartSubTotal() * 0.014} </p>
          </div>
          <div>
            {cartItems.length === 0 ? <button disabled={true}  ></button> :

              // <button    onClick={function() {
              //     console.log(process.env.REACT_APP_KEY)
              //     }}>

              //   </button>
              <StripeCheckout stripeKey="pk_test_551MhYJTSCagZH7yrj9FcCJlbkb9QZ2ZFagaSTAt86MSuHXgUsvEqKMwEO5GsmZBRCd2GSMAgwbocrdkeP9oafTchR00PnZEtmhaa"
                token={makePayment} amount={getCartSubTotal() * 100 * 0.014}
                shippingAddress
                billingAddress
                name="Buy Products" />

            }
          </div>
        </div>
      </div>

    </>
  );
};

export default CartScreen;
