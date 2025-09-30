import "bootstrap/dist/css/bootstrap.min.css";
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

// CONTEXTS
import { ProductProvider } from "./contexts/ProductsContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <Header />
              <main className="container-fluid">
                <div className="mx-1">
                  {/* PRODUCTS PAGE */}
                  <Routes>
                    <Route path="/" element={<ProductsListing />} />
                    <Route
                      path="/products/:productId"
                      element={<ProductDetail />}
                    />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/cart" element={<Cart />} />
                  </Routes>
                </div>
              </main>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </>
  );
}

export default App;
