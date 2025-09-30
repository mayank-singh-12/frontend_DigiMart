import { useState, useEffect } from "react";
import useCart from "../contexts/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, setCart } = useCart();

  return (
    <>
      <div className="row">
        <h1 className="text-center">My Cart ({cart.length})</h1>
        {cart.length === 0 && (
          <p className="mt-5">No products in the Wishlist.</p>
        )}
        <div className="row">
          <div className="col-8">
            {cart.map((product) => (
              <div key={product._id}>
                <div className="card shadow mb-5 bg-body-tertiary">
                  <div className="row">
                    <div className="col-4">
                      <img
                        className="img-fluid rounded-start"
                        src={product.images[0]}
                        alt={product.title}
                      />
                    </div>
                    <div className="col-8">
                      <div className="mx-5 my-5">
                        <p className="fs-2">{product.title}</p>
                        <div className="d-flex align-items-baseline gap-3">
                          <span className="fw-bold fs-1">
                            ${product.discountedPrice}
                          </span>
                          <span className="text-secondary text-decoration-line-through fs-4">
                            ${product.price}
                          </span>
                        </div>
                        <p className="fw-bold fs-2 text-secondary">
                          {product.discount}% off
                        </p>
                        <div className="d-flex align-items-center">
                          <span className="fs-4 me-3">Quantity: </span>
                          <button className="btn btn-outline-light"> - </button>
                          <span className="px-3">{product.quantity}</span>
                          <button className="btn btn-outline-light">+</button>
                        </div>
                        <button className="mt-3 btn btn-outline-danger">
                          Remove From Cart
                        </button>
                        <br />

                        <button className="mt-3 btn btn-outline-warning">
                          Move to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-4"></div>
        </div>
      </div>
    </>
  );
}
