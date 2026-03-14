import React, { createContext, useReducer, useEffect } from "react";

export const StoreContext = createContext();

/* LOAD CART FROM LOCAL STORAGE */

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

/* REDUCER */

function reducer(state, action) {

  switch (action.type) {

    /* ADD PRODUCT WITH CUSTOM OPTIONS */

    case "ADD_TO_CART": {

      const exist = state.cart.find(
        item =>
          item._id === action.payload._id &&
          item.weight === action.payload.weight &&
          item.flavour === action.payload.flavour &&
          item.deliveryDate === action.payload.deliveryDate &&
          item.deliverySlot === action.payload.deliverySlot
      );

      if (exist) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item._id === action.payload._id &&
            item.weight === action.payload.weight &&
            item.flavour === action.payload.flavour &&
            item.deliveryDate === action.payload.deliveryDate &&
            item.deliverySlot === action.payload.deliverySlot
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.payload,
            quantity: 1
          }
        ]
      };
    }

    /* INCREASE */

    case "INCREASE_QTY":

      return {
        ...state,
        cart: state.cart.map(item =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };

    /* DECREASE */

    case "DECREASE_QTY":

      return {
        ...state,
        cart: state.cart
          .map(item =>
            item._id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(item => item.quantity > 0)
      };

    /* REMOVE */

    case "REMOVE_FROM_CART":

      return {
        ...state,
        cart: state.cart.filter(item => item._id !== action.payload)
      };

    default:
      return state;
  }
}

/* PROVIDER */

export const StoreProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};