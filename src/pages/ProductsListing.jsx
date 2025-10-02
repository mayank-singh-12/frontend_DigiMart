import { Link, useNavigate } from "react-router-dom";
import ProductFilter from "../components/ProductFilter";
import useProducts from "../contexts/ProductsContext";
import useWishlist from "../contexts/WishlistContext";
import useCart from "../contexts/CartContext";
import AddWishlist from "../components/AddWishlist";
import AddCart from "../components/AddCart";
import WishList from "./Wishlist";

export default function ProductsListing() {
  const { filteredProducts, productLoading, productError } = useProducts();

  function printCategories(categoriesArrObj) {
    const categoriesArr = categoriesArrObj.reduce((acc, curr) => {
      acc.push(curr.name);
      return acc;
    }, []);
    return categoriesArr.join(", ");
  }

  console.log(filteredProducts);

  return (
    <>
      <div className="row">
        <ProductFilter bootstrapClass="col-2" />
        <div className="col-10">
          {/* page heading  */}
          <p>
            <strong className="fs-4">Showing All Products</strong>{" "}
            {filteredProducts.length != 0 && (
              <span className="ms-3">
                ( showing {filteredProducts.length} products )
              </span>
            )}
          </p>

          {productLoading && <p>Loading...</p>}

          {/* products */}
          {filteredProducts.length != 0 ? (
            <>
              <div className="row">
                {filteredProducts.map((product) => (
                  <div className="col-3" key={product._id}>
                    <div className="card shadow mb-5 bg-body-tertiary">
                      <Link
                        to={`/products/${product._id}`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        <img
                          className="card-img-top"
                          src={product.images[0]}
                          alt={product.title}
                        />
                        <div className="card-body text-center">
                          <p className="card-title">{product.title}</p>
                          <p>
                            <small className="text-body-secondary">
                              {printCategories(product.category)}
                            </small>
                          </p>
                          <div className="d-flex align-items-baseline justify-content-center gap-2">
                            <span className="card-text fs-3 fw-bold">
                              ${product.discountedPrice}
                            </span>
                            <span className="card-text text-muted text-decoration-line-through">
                              ${product.price}
                            </span>
                          </div>
                        </div>
                      </Link>
                      <AddWishlist product={product} />
                      <AddCart product={product} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            productError && <p>{productError}</p>
          )}
        </div>
      </div>
    </>
  );
}
