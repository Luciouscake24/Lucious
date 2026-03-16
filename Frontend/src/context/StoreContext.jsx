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

/* CREATE UNIQUE VARIANT KEY */

const getCartKey = (item) => {
  return `${item._id}_${item.weight}_${item.flavour}_${item.deliveryDate}_${item.deliverySlot}`;
};

const initialState = {
  cart: loadCart(),
  saveForLater: loadSaved()
};

/* REDUCER */

function reducer(state, action) {

  switch (action.type) {

    /* ADD PRODUCT */

    case "ADD_TO_CART": {

      const key = getCartKey(action.payload);

      const exist = state.cart.find(
        item => item.cartKey === key
      );

      if (exist) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.cartKey === key
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
            quantity: 1,
            cartKey: key
          }
        ]
      };
    }

    /* INCREASE QTY */

    case "INCREASE_QTY":

      return {
        ...state,
        cart: state.cart.map(item =>
          item.cartKey === action.payload
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
            item.cartKey === action.payload
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
          item => item.cartKey !== action.payload
        )
      };

    /* SAVE FOR LATER */

    case "SAVE_FOR_LATER": {

      const item = state.cart.find(
        i => i.cartKey === action.payload
      );

      if (!item) return state;

      const alreadySaved = state.saveForLater.find(
        i => i.cartKey === action.payload
      );

      return {
        ...state,
        cart: state.cart.filter(
          i => i.cartKey !== action.payload
        ),
        saveForLater: alreadySaved
          ? state.saveForLater
          : [...state.saveForLater, item]
      };
    }

    /* MOVE BACK TO CART */

    case "MOVE_TO_CART": {

      const item = state.saveForLater.find(
        i => i.cartKey === action.payload
      );

      if (!item) return state;

      const exist = state.cart.find(
        i => i.cartKey === action.payload
      );

      return {
        ...state,
        saveForLater: state.saveForLater.filter(
          i => i.cartKey !== action.payload
        ),
        cart: exist
          ? state.cart
          : [...state.cart, item]
      };
    }

    /* REMOVE FROM SAVE FOR LATER */

    case "REMOVE_FROM_SAVED":

      return {
        ...state,
        saveForLater: state.saveForLater.filter(
          item => item.cartKey !== action.payload
        )
      };

    /* CLEAR CART AFTER ORDER */

    case "CLEAR_CART":

      return {
        ...state,
        cart: []
      };

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

  /* SAVE TO LOCAL STORAGE */

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