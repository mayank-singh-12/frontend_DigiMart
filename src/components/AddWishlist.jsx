import useWishlist from "../contexts/WishlistContext";
import { useState } from "react";

export default function AddWishlist({ product }) {
  const { wishlist, setWishlist } = useWishlist();

  function addToWishlist(product) {
    if (!wishlist.some((p) => p._id == product._id))
      setWishlist((prev) => [...prev, product]);
  }
  function removeFromWishlist(product) {
    setWishlist((prev) => prev.filter((p) => p._id != product._id));
  }
  const isWishlisted = wishlist.some((p) => p._id == product._id);
  return (
    <>
      {isWishlisted ? (
        <button
          className="btn btn-outline-danger"
          onClick={() => removeFromWishlist(product)}
        >
          Remove from Wishlist
        </button>
      ) : (
        <button
          className="btn btn-outline-warning"
          onClick={() => addToWishlist(product)}
        >
          Add to Wishlist
        </button>
      )}
    </>
  );
}
