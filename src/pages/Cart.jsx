import { useState, useEffect } from "react";
import useCart from "../contexts/CartContext";
import { Link } from "react-router-dom";
import useWishlist from "../contexts/WishlistContext";

export default function Cart() {
  const { cart, setCart } = useCart();
  const { wishlist, setWishlist } = useWishlist();

  const [order, setOrder] = useState({});

  function removeFromCart(product) {
    setCart((prev) => prev.filter((p) => p._id !== product._id));
  }

  function moveToWishlist(product) {
    const inWishlist = wishlist.some((p) => p._id === product._id);
    if (!inWishlist) {
      const { quantity, ...restProduct } = product;
      setWishlist((prev) => [...prev, restProduct]);
    } else {
      // TODO: add message if product is present in wishlist.
    }
    setCart((prev) => prev.filter((p) => p._id !== product._id));
  }

  function updateQuantity(product, operator) {
    const updatedCart = cart.reduce((acc, curr) => {
      if (curr._id === product._id) {
        if (operator === "inc") {
          return [
            ...acc,
            {
              ...curr,
              quantity: product.quantity + 1,
            },
          ];
        } else if (operator === "dec") {
          return [
            ...acc,
            {
              ...curr,
              quantity: product.quantity - 1,
            },
          ];
        } else {
          throw "Please pass an operator";
        }
      }
      return [...acc, curr];
    }, []);

    setCart(updatedCart);
  }

  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  const totalDiscountedPrice = cart.reduce(
    (acc, curr) => acc + curr.discountedPrice * curr.quantity,
    0
  );
  const discountAmount = totalPrice - totalDiscountedPrice;
  const deliveryCharges = 499;
  const totalAmount = totalDiscountedPrice + deliveryCharges;

  console.log(cart);
  return (
    <>
      <div className="container">
        <div className="row">
          <h1 className="text-center">My Cart ({cart.length})</h1>
          {cart.length === 0 ? (
            <p className="text-center mt-5">No products in the Cart.</p>
          ) : (
            <div className="row">
              <div className="col-8">
                {cart.map((product) => (
                  <div key={product._id}>
                    <div className="card shadow mb-3 bg-body-tertiary">
                      <div className="row">
                        <div className="col-4">
                          <img
                            className="img-fluid rounded-start"
                            src={product.images[0]}
                            alt={product.title}
                          />
                        </div>
                        <div className="col-8">
                          <div>
                            <p className="fs-2 m-0">{product.title}</p>
                            <div className="d-flex align-items-baseline gap-3">
                              <span className="fw-bold fs-1">
                                ${product.discountedPrice}
                              </span>
                              <span className="text-secondary text-decoration-line-through fs-4">
                                ${product.price}
                              </span>
                            </div>
                            <p className="fw-bold fs-3 m-0 text-secondary">
                              {product.discount}% off
                            </p>
                            {/* Quantity */}
                            <div className="d-flex mt-1 align-items-center">
                              <span className="fs-4 me-3">Quantity: </span>
                              <button
                                className="btn btn-light"
                                onClick={() => updateQuantity(product, "dec")}
                                disabled={product.quantity <= 1}
                              >
                                {" "}
                                -{" "}
                              </button>
                              <span className="px-3">{product.quantity}</span>
                              <button
                                className="btn btn-light"
                                onClick={() => updateQuantity(product, "inc")}
                              >
                                +
                              </button>
                            </div>
                            <div className="btn-group-vertical d-flex mt-4 me-4">
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => removeFromCart(product)}
                              >
                                Remove From Cart
                              </button>
                              <button
                                className="btn btn-outline-warning"
                                onClick={() => moveToWishlist(product)}
                              >
                                Move to Wishlist
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-4">
                <div className="card position-sticky shadow bg-body-tertiary">
                  <div className="card-body">
                    <h4>PRICE DETAILS</h4>
                    <hr />
                    <div className="d-flex justify-content-between fs-5">
                      <span>
                        Price ({cart.length}{" "}
                        {cart.length <= 1 ? "item" : "items"})
                      </span>
                      <span>${totalDiscountedPrice}</span>
                    </div>
                    <div className="d-flex justify-content-between fs-5">
                      <span>Discount</span>
                      <span>-${discountAmount}</span>
                    </div>
                    <div className="d-flex justify-content-between fs-5">
                      <span>Delivery Charges</span>
                      <span>${deliveryCharges}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-baseline fw-medium fs-4">
                      <span>TOTAL AMOUNT</span>
                      <span>${totalAmount}</span>
                    </div>
                    <hr />
                    <p className="fs-5">
                      You will save ${discountAmount} on this order.
                    </p>
                    <div className="d-flex flex-column">
                      <Link to="/checkout" className="btn btn-primary">
                        PLACE ORDER
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
