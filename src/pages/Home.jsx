import Header from "../components/Header";
import { Link } from "react-router-dom";
import useCategories from "../contexts/CategoriesContext";
export default function Home() {
  const { categories, categoriesError } = useCategories();
  return (
    <>
      <Header />
      <main className="container-fluid mt-3">
        <div className="row">
          {categories
            ? categories.map((category) => (
                <div className="col" key={category._id}>
                  <div className="card shadow" style={{ height: "100px" }}>
                    <Link
                      className="d-flex position-relative overflow-hidden"
                      style={{ textDecoration: "none" }}
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
              ))
            : categoriesError && <p>{categoriesError}</p>}
        </div>

        <Link to="/products" className="mt-4 card position-relative d-flex justify-content-center align-items-center overflow-hidden" style={{ height: "50vh" }}>
          <p className="position-absolute z-1 fw-bold" style={{fontSize:"100px"}}>Explore All Products</p>
          <img
            className="card-img opacity-25"
            src="https://images.pexels.com/photos/12792220/pexels-photo-12792220.jpeg?_gl=1*3x4e6h*_ga*MjEwMzM5MjEyNy4xNzYwMDI2NjE1*_ga_8JE65Q40S6*czE3NjAwMjY2MTQkbzEkZzEkdDE3NjAwMjY3MjMkajIwJGwwJGgw"
            alt=""
          />
        </Link>
      </main>
    </>
  );
}
