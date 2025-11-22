import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import useWishlist from "../contexts/WishlistContext";
import useCart from "../contexts/CartContext";
import useProducts from "../contexts/ProductsContext";

export default function Header({ searchBox = false }) {
  const { search, setSearch, setCategoryFilter } = useProducts();
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  return (
    <>
      <header className="sticky-top shadow">
        <nav className="navbar navbar-expand-lg bg-black bg-gradient">
          <div className="container-fluid d-flex justify-content-between">
            <NavLink
              to="/"
              className="navbar-brand fw-bold fs-3 ms-1 py-1"
              onClick={() => {
                setCategoryFilter([]);
              }}
            >
              DigiMart
            </NavLink>

            {/* search */}
            {/* {searchBox && (
              <div className="input-group w-25" style={{ width: "400px" }}>
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            )} */}

            {/* Rest Links */}
            <div className="me-1">
              <ul className="nav">
                <li className="nav-item">
                  <NavLink
                    to="/wishlist"
                    className="nav-link p-0 position-relative me-3"
                  >
                    <i className="bi bi-bag-heart-fill fs-4 text-light"></i>
                    {wishlist.length > 0 && (
                      // <small className="position-absolute bg-danger text-light rounded px-1 start-100 translate-middle">

                      // </small>)}

                      <div
                        className="position-absolute bg-danger rounded-circle top-0 start-100 translate-middle d-flex justify-content-center align-items-center mt-1"
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
                      >
                        <p
                          className="text-light m-0"
                          style={{ fontSize: "12px" }}
                        >
                          {wishlist.length}
                        </p>
                      </div>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cart"
                    className="nav-link p-0 position-relative me-3"
                  >
                    <i className="bi bi-cart-fill fs-4 text-light"></i>
                    {cart.reduce((acc, curr) => acc + curr.quantity, 0) > 0 && (
                      <div
                        className="position-absolute bg-danger rounded-circle top-0 start-100 translate-middle d-flex justify-content-center align-items-center mt-1"
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
                      >
                        <p
                          className="text-light m-0"
                          style={{ fontSize: "12px" }}
                        >
                          {cart.reduce((acc, curr) => acc + curr.quantity, 0)}
                        </p>
                      </div>
                    )}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/profile" className="nav-link p-0">
                    <i className="bi bi-person-circle fs-4 text-light"></i>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
