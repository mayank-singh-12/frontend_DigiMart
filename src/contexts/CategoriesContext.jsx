import { useContext, createContext } from "react";
import { useState, useEffect } from "react";
import useFetch from "../useFetch";

const CategoriesContext = createContext();

export default function useCategories() {
  return useContext(CategoriesContext);
}

export function CategoriesProvider({ children }) {
  const { data, loading, error } = useFetch(
    "https://backend-digi-mart.vercel.app/categories"
  );
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data.categories) setCategories(data.categories);
  }, [data]);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        setCategories,
        catgoriesLoading: loading,
        catgoriesError: error,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
