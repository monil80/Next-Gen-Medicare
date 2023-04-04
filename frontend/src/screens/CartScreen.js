import "../styles/CartScreen.css";
import React  from 'react';

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { useHistory} from "react-router-dom"
//import axios from "axios";

//import {getcart as list} from "../redux/actions/cartActions"

// Components
import CartItem from "../components/CartItem";

// Actions
import { addToCart, removeFromCart } from "../redux/actions/cartActions";


const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useHistory();

   
  
  const cart = useSelector((state) => state.cart );
  const { cartItems } = cart;

      
    
  
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
      price: getCartSubTotal(),
      cart:cartItems,
      qty:getCartCount(),

    }
    const headers = {
      "content-type": "application/json"
    }

    return fetch("http://localhost:5000/api/payment", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    }).then(response => {
      //console.log("RESPONSE", response)
      //const { status } = response
      //console.log("status", status)

      // Empty The cart after Succcesfull Payment
      cartItems.forEach(item => dispatch(removeFromCart(item.product)))

      navigate.push("/sucess")
    }).catch(error => {
     // console.log("ERROR", error)
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
            <p>TOTAL(USD) : ${getCartSubTotal() * 0.0029} </p>
          </div>
          <div>
            {cartItems.length === 0 ? (
              <button disabled={true}></button>
            ) : (
              // <button    onClick={function() {
              //     console.log(process.env.REACT_APP_KEY)
              //     }}>

              //   </button>
              <StripeCheckout
                stripeKey="pk_test_51Mh79dSJHjB0JqGf3VMcaTZiEQbMtNIVGfI3wKguWvaga66zBQUItyWHHWhxy9VnRY24HoVA8UiSAj5R5gvcEj2v00kUthYmQ6"
                token={makePayment}
                amount={getCartSubTotal() * 100}
                shippingAddress
                billingAddress
                image="https://i.postimg.cc/yxsNfCFW/logo.jpg"
                name="Next Gen Medicare"
                description="payment gateway"
                currency="INR"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartScreen;

// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 

//--------------------------------
// import "../styles/CartScreen.css";
// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import StripeCheckout from "react-stripe-checkout";

// // Components
// import CartItem from "../components/CartItem";

// // Actions
// import { addToCart, removeFromCart } from "../redux/actions/cartActions";


// const CartScreen = () => {
//   const dispatch = useDispatch();

//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;

//   useEffect(() => { }, []);

//   const qtyChangeHandler = (id, qty) => {
//     dispatch(addToCart(id, qty));
//   };

//   // Removing selected item from the cart
//   const removeFromCartHandler = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   // To get the total items present in the cart
//   const getCartCount = () => {
//     return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
//   };
//   // Getting the total Price 
//   const getCartSubTotal = () => {
//     return cartItems
//       .reduce((price, item) => price + item.price * item.qty, 0)
//       .toFixed(2);
//   };
    

//   // Make Payment
//   const makePayment = token => {
//     const body = {
//       token,
//       product: cartItems,
//       price: getCartSubTotal()

//     }
//     const headers = {
//       "content-type": "application/json"
//     }

//     return fetch(`http://localhost:5000/payment`, {
//       method: "POST",
//       headers: headers,
//       body: JSON.stringify(body)
//     }).then(response => {
//       console.log("RESPONSE", response)
//       const { status } = response
//       console.log("status", status)

//       // Empty The cart after Succcesfull Payment
//       cartItems.forEach(item => dispatch(removeFromCart(item.product)))
//     }).catch(error => {
//       console.log("ERROR", error)
//     })

//   }


//   return (
//     <>
//       <div className="cartscreen" style={{ marginBottom: "460px" }}>
//         <div className="cartscreen__left">
//           <h2>Shopping Cart</h2>

//           {cartItems.length === 0 ? (
//             <div>
//               Your Cart Is Empty <Link to="/">Go Back</Link>
//             </div>
//            ) : (
//             cartItems.map((item) => (
//               <CartItem
//                 key={item.product}
//                 item={item}
//                 qtyChangeHandler={qtyChangeHandler}
//                 removeHandler={removeFromCartHandler}
//               />
//             ))
//           )}
//         </div>

//         <div className="cartscreen__right">
//           <div className="cartscreen__info">
//             <p>Subtotal ({getCartCount()}) items</p>
//             <p>TOTAL(INR) : ₹{getCartSubTotal()} </p>
//             <p>TOTAL(USD) : ${getCartSubTotal() * 0.014} </p>
//           </div>
//           <div>
//             <button type="button" onClick={function() {
//               console.log(process.env.REACT_APP_KEY)
//               }}>
//               <StripeCheckout stripeKey="pk_test_51IPsBgEwEbzzqba9A4AQsmpCvFKjJbN9AyCrLYwCykIR1XTe8mFHcRQB6qWHz1Y6D8XZSK0gHi2CIr92nDzrs07f00W0hXIIRv"
//                 token={makePayment} amount={getCartSubTotal() * 100 * 0.014}
//                 shippingAddress
//                 billingAddress
//                 name="Buy Products" />
//             </button>
//           </div>
//         </div>
//       </div>

//     </>
//   );
// };

// export default CartScreen;