import * as actionTypes from "../constants/cartConstants";
//import React, {useEffect,useState}from 'react';

// const CART_INITIAL_STATE = {

//   cartItems: [],
// };

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case actionTypes.GET_TO_CART:
      return {
        cartItems: action.payload,
      };
    default:
      return state;
  }
};
