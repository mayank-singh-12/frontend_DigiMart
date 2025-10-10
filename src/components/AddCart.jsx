import useCart from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddCart({ product }) {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const inCart = cart.some((p) => p._id == product._id);

  function handleCart(product) {
    if (!inCart) {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  }
  return (
    <>
      {inCart ? (
        <button className="btn btn-primary" onClick={() => navigate("/cart")}>
          Go to Cart
        </button>
      ) : (
        <button
          className="btn btn-outline-light"
          onClick={() => {
            toast.success("Product added to cart.");
            handleCart(product);
          }}
        >
          Add to Cart
        </button>
      )}
    </>
  );
}
