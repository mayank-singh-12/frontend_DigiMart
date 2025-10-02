import { useState, useEffect, useContext, createContext } from "react";
import useFetch from "../useFetch";

const ProductsContext = createContext();

export default function useProducts() {
  return useContext(ProductsContext);
}

export function ProductProvider({ children }) {
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { data, loading, error } = useFetch(
    "https://backend-digi-mart.vercel.app/products"
  );

  const products = data.products?.map((product) => {
    const actualPrice = product.price;
    const discountRate = product.discount / 100;
    const discountedPrice = Math.ceil(actualPrice - actualPrice * discountRate);
    const quantity = 1;
    return { ...product, discountedPrice, quantity };
  });

  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [data]);

  return (
    <ProductsContext.Provider
      value={{
        products: products || [],
        productLoading: loading,
        productError: error,
        filteredProducts,
        setFilteredProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
