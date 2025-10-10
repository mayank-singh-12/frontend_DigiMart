import Header from "../components/Header";
import { useState, useEffect } from "react";
import useFetch from "../useFetch";
import useProducts from "../contexts/ProductsContext";
import Slider from "@mui/material/Slider";

export default function ProductFilter({ bootstrapClass }) {
  const {
    products,
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
  } = useProducts();

  const { data, loading, error } = useFetch(
    "https://backend-digi-mart.vercel.app/categories"
  );

  function handleCategory(e) {
    const isChecked = e.target.checked;
    if (!isChecked) {
      setCategoryFilter((prev) => prev.filter((c) => c != e.target.value));
    } else {
      setCategoryFilter((prev) => [...prev, e.target.value]);
    }
  }

  // PRODUCTS FILTER
  useEffect(() => {
    let productsByCategory = products;

    if (categoryFilter.length != 0) {
      productsByCategory = products.filter((product) =>
        product.category.some((category) =>
          categoryFilter.includes(category.name)
        )
      );
    }

    let productsByPrice = productsByCategory;
    if (priceFilter != 0) {
      productsByPrice = productsByCategory.filter(
        (product) => product.discountedPrice <= priceFilter
      );
    }

    let productsByRating = productsByPrice;
    if (ratingFilter != 0) {
      productsByRating = productsByPrice.filter(
        (product) => product.rating >= ratingFilter
      );
    }

    let productsSortedByPrice = productsByRating;
    if (priceSort != null) {
      if (priceSort == "desc") {
        productsSortedByPrice = productsByRating.toSorted(
          (a, b) => b.discountedPrice - a.discountedPrice
        );
      } else {
        productsSortedByPrice = productsByRating.toSorted(
          (a, b) => a.discountedPrice - b.discountedPrice
        );
      }
    }

    let productsBySearch = productsSortedByPrice;
    if (search !== "") {
      productsBySearch = productsBySearch.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(productsBySearch);
  }, [categoryFilter, priceFilter, ratingFilter, priceSort, search]);

  function clearFilters() {
    setCategoryFilter([]);
    setPriceFilter(0);
    setRatingFilter(0);
    setPriceSort(null);
    setFilteredProducts(products);
  }

  const categoriesList =
    data &&
    data.categories.map((category) => (
      <div key={category._id}>
        <label>
          <input
            type="checkbox"
            name="category"
            value={category.name}
            checked={categoryFilter.includes(category.name)}
            onChange={handleCategory}
          />
          {category.name}
        </label>
      </div>
    ));

  const mostExpensiveProduct =
    products.length != 0
      ? products.reduce((acc, curr) => (curr.price > acc ? curr.price : acc), 0)
      : 100000;

  const ratings = [
    { value: 4, tag: "4 and Above" },
    { value: 3, tag: "3 and Above" },
    { value: 2, tag: "2 and Above" },
    { value: 1, tag: "1 and Above" },
  ];

  const sortArr = [
    { value: "asc", tag: "Price - Low to High" },
    { value: "desc", tag: "Price - High to Low" },
  ];

  return (
    <>
      {/* PRODUCT FILTERS */}
      <div className={bootstrapClass}>
        <div className="card mt-4 position-fixed" style={{ minWidth: "295px" }}>
          <div className="card-body">
            <h4 className="card-title">Filters</h4>
            {/* price  */}
            <div>
              <h5>Price</h5>
              <div className="d-flex justify-content-between">
                <span>0</span>
                <span>{mostExpensiveProduct}</span>
              </div>
            </div>

            <Slider
              step={100}
              value={priceFilter}
              defaultValue={0}
              min={0}
              max={mostExpensiveProduct}
              aria-label="Default"
              valueLabelDisplay="on"
              onChange={(e) => setPriceFilter(parseInt(e.target.value))}
            />

            {/* category */}
            <div className="mt-2">
              <h5>Category</h5>
              {loading && <p>Loading...</p>}
              {categoriesList && <>{categoriesList}</>}
              {error && <p>{error}</p>}
            </div>

            {/* rating */}
            <div className="mt-2">
              <h5>Rating</h5>
              {ratings.map((rating) => (
                <div key={rating.value}>
                  <label>
                    <input
                      type="radio"
                      name="priceFilter"
                      value={rating.value}
                      checked={ratingFilter == rating.value}
                      onChange={(e) => setRatingFilter(e.target.value)}
                    />
                    {rating.tag}
                  </label>
                </div>
              ))}
            </div>

            {/* sort by */}
            <div className="mt-2">
              <h5>Sort</h5>
              {sortArr.map((sort) => (
                <div key={sort.value}>
                  <label>
                    <input
                      type="radio"
                      value={sort.value}
                      checked={priceSort === sort.value}
                      onChange={(e) => setPriceSort(sort.value)}
                    />
                    {sort.tag}
                  </label>
                </div>
              ))}
            </div>

            <button
              className="btn btn-outline-primary mt-4"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
