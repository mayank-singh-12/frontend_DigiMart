import { useState, useEffect, useContext, createContext } from "react";
import useFetch from "../useFetch";

const ProductsContext = createContext();

export default function useProducts() {
  return useContext(ProductsContext);
}

export function ProductProvider({ children }) {
  const { data, loading, error } = useFetch(
    "https://backend-digi-mart.vercel.app/products"
  );

  // FILTER VARS
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]); // ["Mobiles", "Laptops"]
  const [priceFilter, setPriceFilter] = useState(0);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [priceSort, setPriceSort] = useState(null); // "desc" / "asc"
  const [search, setSearch] = useState("");

  const products = data.products?.map((product) => {
    const actualPrice = product.price;
    const discountRate = product.discount / 100;
    const discountedPrice = Math.ceil(actualPrice - actualPrice * discountRate);
    const quantity = 1;
    return {
      ...product,
      discountedPrice,
      quantity,
    };
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
        categoryFilter,
        setCategoryFilter,
        priceFilter,
        setPriceFilter,
        ratingFilter,
        setRatingFilter,
        priceSort,
        setPriceSort,
        search,
        setSearch,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
