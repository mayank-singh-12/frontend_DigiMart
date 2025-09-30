import { NavLink, Link } from "react-router-dom";
import useWishlist from "../contexts/WishlistContext";
import useCart from "../contexts/CartContext";

export default function Header() {
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand fw-bold fs-3 mx-5 py-1">
            DigiMart
          </NavLink>
          <ul className="nav">
            <li className="nav-item">
              <NavLink to="/wishlist" className="nav-link">
                Wishlist ({wishlist.length})
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className="nav-link">
                Cart ({cart.length})
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
