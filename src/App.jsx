import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// PAGES
import Home from "./pages/Home";
import ProductsListing from "./pages/ProductsListing";
import ProductDetail from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

// CONTEXTS
import { ProductProvider } from "./contexts/ProductsContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { CartProvider } from "./contexts/CartContext";
import { AddressProvider } from "./contexts/AddressContext";
import { CategoriesProvider } from "./contexts/CategoriesContext";

function App() {
  return (
    <>
      <ProductProvider>
        <CategoriesProvider>
          <CartProvider>
            <WishlistProvider>
              <AddressProvider>
                <ToastContainer
                  position="bottom-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={true}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="dark"
                />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductsListing />} />
                    <Route
                      path="/products/:productId"
                      element={<ProductDetail />}
                    />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/orderSuccess" element={<OrderSuccess />} />
                  </Routes>
                </BrowserRouter>
              </AddressProvider>
            </WishlistProvider>
          </CartProvider>
        </CategoriesProvider>
      </ProductProvider>
    </>
  );
}

export default App;
