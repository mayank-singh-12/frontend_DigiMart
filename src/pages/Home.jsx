import Header from "../components/Header";
import { Link } from "react-router-dom";
import useCategories from "../contexts/CategoriesContext";
import useProducts from "../contexts/ProductsContext";
import Rating from "@mui/material/Rating";

export default function Home() {
  const { categories, categoriesError, catgoriesLoading } = useCategories();
  const { products, setCategoryFilter } = useProducts();

  const starProduct =
    products.length > 0 &&
    products.reduce(
      (acc, curr) => (curr.rating > acc.rating ? curr : acc),
      products[0]
    );

  const mostDiscounted =
    products.length > 0 &&
    products.reduce(
      (acc, curr) => (curr.discount > acc.discount ? curr : acc),
      products[0]
    );

  function printCategories(categoriesArrObj) {
    const categoriesArr = categoriesArrObj.reduce((acc, curr) => {
      acc.push(curr.name);
      return acc;
    }, []);
    return categoriesArr.join(", ");
  }

  return (
    <>
      <Header />
      <main className="container-fluid mt-3">
        {catgoriesLoading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: "100%", height: "80vh" }}
          >
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Categories  */}
        {categories.length > 0 ? (
          <>
            <div className="row">
              {categories.map((category) => (
                <div className="col" key={category._id}>
                  <div className="card shadow" style={{ height: "100px" }}>
                    <Link
                      to="/products"
                      className="d-flex position-relative overflow-hidden"
                      style={{ textDecoration: "none" }}
                      onClick={() => {
                        setCategoryFilter([category.name]);
                      }}
                    >
                      <p className="position-absolute top-50 start-50 translate-middle text-light fw-medium fs-1 z-1">
                        {category.name}
                      </p>
                      <img
                        className="card-img opacity-25"
                        src={category.products[0].images[0]}
                        alt={category.name}
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Explore all products */}
            <Link
              to="/products"
              className="mt-4 card shadow position-relative d-flex justify-content-center align-items-center overflow-hidden"
              style={{ height: "40vh" }}
            >
              <p
                className="position-absolute z-1 fw-bold"
                style={{ fontSize: "100px" }}
              >
                Explore All Products
              </p>
              <img
                className="card-img opacity-25"
                src="https://images.pexels.com/photos/12792220/pexels-photo-12792220.jpeg?_gl=1*3x4e6h*_ga*MjEwMzM5MjEyNy4xNzYwMDI2NjE1*_ga_8JE65Q40S6*czE3NjAwMjY2MTQkbzEkZzEkdDE3NjAwMjY3MjMkajIwJGwwJGgw"
                alt=""
              />
            </Link>

            <div className="row my-4">
              {/* Star product */}
              {starProduct && (
                <div className="col-6">
                  <div className="card bg-body-tertiary shadow">
                    <Link
                      to={`/products/${starProduct._id}`}
                      className="text-decoration-none text-light"
                    >
                      <div className="row g-0">
                        <div className="col-4">
                          <img
                            className="img-fluid rounded-start"
                            src={starProduct.images[0]}
                            alt={starProduct.title}
                          />
                        </div>
                        <div className="col-8">
                          <div className="card-body">
                            <h1>
                              Star Product{" "}
                              <i class="bi bi-star-fill text-warning"></i>
                            </h1>
                            <p className="fs-2 m-0">{starProduct.title}</p>
                            <p className="text-secondary m-0">
                              {printCategories(starProduct.category)}
                            </p>
                            <div className="d-flex align-items-baseline fs-2">
                              <h1 className="display-1 fw-bold text-secondary">
                                {starProduct.rating}
                              </h1>
                              <span className="ms-2">
                                <Rating
                                  defaultValue={starProduct.rating}
                                  precision={0.1}
                                  size="large"
                                  readOnly
                                />
                              </span>
                            </div>
                            <div className="d-flex align-items-baseline gap-2">
                              <span className="fw-bold fs-1">
                                ${starProduct.discountedPrice}
                              </span>
                              <span className="fw-medium text-secondary fs-4 text-decoration-line-through">
                                ${starProduct.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}

              {/* Most Discounted */}
              {mostDiscounted && (
                <div className="col-6">
                  <div className="card bg-body-tertiary shadow text-light">
                    <Link
                      to={`/products/${mostDiscounted._id}`}
                      className="text-decoration-none text-light"
                    >
                      <div className="row g-0">
                        <div className="col-4">
                          <img
                            className="img-fluid rounded-start"
                            src={mostDiscounted.images[0]}
                            alt={mostDiscounted.title}
                          />
                        </div>
                        <div className="col-8">
                          <div className="card-body">
                            <h1>
                              Best Deal{" "}
                              <i class="bi bi-heart-fill text-danger"></i>
                            </h1>
                            <p className="fs-2 m-0">{mostDiscounted.title}</p>
                            <p className="text-secondary m-0">
                              {printCategories(mostDiscounted.category)}
                            </p>
                            <h1 className="display-1 fw-bold text-secondary">
                              {mostDiscounted.discount}
                              <span className="display-5 fw-bold">% Off</span>
                            </h1>
                            <div className="d-flex align-items-baseline gap-2">
                              <span className="fw-bold fs-1">
                                ${mostDiscounted.discountedPrice}
                              </span>
                              <span className="fw-medium text-secondary fs-4 text-decoration-line-through">
                                ${mostDiscounted.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          categoriesError && <p>{categoriesError}</p>
        )}
      </main>
    </>
  );
}
