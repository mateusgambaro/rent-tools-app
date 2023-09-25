import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const removeFromCart = (product) => {
    setCart(cart.filter((cartItem) => cartItem.id !== product.id));
  };

  return (
    <CartContext.Provider value={{ cart, setCart, removeFromCart  }}>
      {children}
    </CartContext.Provider>
  );
};
