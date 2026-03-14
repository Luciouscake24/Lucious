import React, { createContext, useReducer, useEffect } from "react";

export const StoreContext = createContext();

/* LOAD CART */

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
};

/* LOAD SAVE FOR LATER */

const loadSaved = () => {
  try {
    return JSON.parse(localStorage.getItem("saveForLater")) || [];
  } catch {
    return [];
  }
};

const initialState = {
  cart: loadCart(),
  saveForLater: loadSaved()
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

    /* INCREASE QTY */

    case "INCREASE_QTY":

      return {
        ...state,
        cart: state.cart.map(item =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };

    /* DECREASE QTY */

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

    /* REMOVE FROM CART */

    case "REMOVE_FROM_CART":

      return {
        ...state,
        cart: state.cart.filter(
          item => item._id !== action.payload
        )
      };

    /* SAVE FOR LATER */

    case "SAVE_FOR_LATER": {

      const item = state.cart.find(
        i => i._id === action.payload
      );

      if (!item) return state;

      return {
        ...state,
        cart: state.cart.filter(
          i => i._id !== action.payload
        ),
        saveForLater: [...state.saveForLater, item]
      };
    }

    /* MOVE BACK TO CART */

    case "MOVE_TO_CART": {

      const item = state.saveForLater.find(
        i => i._id === action.payload
      );

      if (!item) return state;

      return {
        ...state,
        saveForLater: state.saveForLater.filter(
          i => i._id !== action.payload
        ),
        cart: [...state.cart, item]
      };
    }

    default:
      return state;
  }
}

/* PROVIDER */

export const StoreProvider = ({ children }) => {

  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  /* SAVE TO LOCALSTORAGE */

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(state.cart)
    );

    localStorage.setItem(
      "saveForLater",
      JSON.stringify(state.saveForLater)
    );

  }, [state.cart, state.saveForLater]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};