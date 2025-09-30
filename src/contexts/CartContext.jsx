import { useState, useEffect, useContext, createContext } from "react";

const CartContext = createContext();

export default function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
