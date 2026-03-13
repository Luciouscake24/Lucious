
import React, { createContext, useReducer, useEffect } from "react";

export const StoreContext = createContext();

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
};

const initialState = {
  cart: loadCart()
};

function reducer(state, action) {

  switch (action.type) {

    /* ADD PRODUCT */

    case "ADD_TO_CART": {

      const exist = state.cart.find(
        i => i._id === action.payload._id
      );

      if (exist) {
        return {
          ...state,
          cart: state.cart.map(i =>
            i._id === action.payload._id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          { ...action.payload, quantity: 1 }
        ]
      };
    }

    /* INCREASE */

    case "INCREASE_QTY":
      return {
        ...state,
        cart: state.cart.map(i =>
          i._id === action.payload
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      };

    /* DECREASE */

    case "DECREASE_QTY":
      return {
        ...state,
        cart: state.cart
          .map(i =>
            i._id === action.payload
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
          .filter(i => i.quantity > 0)
      };

    /* REMOVE */

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          i => i._id !== action.payload
        )
      };

    default:
      return state;
  }
}

export const StoreProvider = ({ children }) => {

  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(state.cart)
    );
  }, [state.cart]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );

};

