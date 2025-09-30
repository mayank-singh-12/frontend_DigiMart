import { useState, useEffect, useContext, createContext } from "react";

const WishlistContext = createContext();

export default function useWishlist() {
  return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <>
      <WishlistContext.Provider value={{ wishlist, setWishlist }}>
        {children}
      </WishlistContext.Provider>
    </>
  );
}
