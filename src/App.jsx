import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// COMPONENTS
import Header from "./components/Header";

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

function App() {
  return (
    <>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <AddressProvider>
              <BrowserRouter>
                <Header />
                <main className="container-fluid">
                  <div className="mx-1">
                    {/* PRODUCTS PAGE */}
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
                  </div>
                </main>
              </BrowserRouter>
            </AddressProvider>
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </>
  );
}

export default App;
