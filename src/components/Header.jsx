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
              className="navbar-brand fw-bold fs-3 mx-5 py-1"
              onClick={() => {
                setCategoryFilter([]);
              }}
            >
              DigiMart
            </NavLink>

            {/* search */}
            {searchBox && (
              <div className="input-group" style={{ width: "400px" }}>
                <span className="input-group-text">
                  <i class="bi bi-search"></i>
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
            )}

            {/* Rest Links */}
            <div>
              <ul className="nav">
                <li className="nav-item">
                  <NavLink to="/wishlist" className="nav-link">
                    Wishlist ({wishlist.length})
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/cart" className="nav-link">
                    Cart ({cart.reduce((acc, curr) => acc + curr.quantity, 0)})
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/profile" className="nav-link">
                    Profile
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
