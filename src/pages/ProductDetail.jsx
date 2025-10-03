import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useFetch from "../useFetch";
import useProducts from "../contexts/ProductsContext";
import AddWishlist from "../components/AddWishlist";
import AddCart from "../components/AddCart";

export default function ProductDetail() {
  const { productId } = useParams();

  const { products } = useProducts();

  const { data, loading, error } = useFetch(
    `https://backend-digi-mart.vercel.app/products/${productId}`
  );
  const [productData, setProductData] = useState();

  useEffect(() => {
    if (data.product) {
      const product = data.product;
      const actualPrice = product.price;
      const discountRate = product.discount / 100;
      const discountedPrice = Math.ceil(
        actualPrice - actualPrice * discountRate
      );
      setProductData({
        ...product,
        discountedPrice,
      });
    }
  }, [data]);

  function printCategories(categoriesArrObj) {
    const categoriesArr = categoriesArrObj.reduce((acc, curr) => {
      acc.push(curr.name);
      return acc;
    }, []);
    return categoriesArr.join(", ");
  }

  const productCategoryArr = productData?.category.map((c) => c.name);
  console.log(productCategoryArr);

  const recommendedProducts =
    productData &&
    products
      .filter((product) =>
        product.category.some(
          (c) =>
            productCategoryArr.includes(c.name) &&
            product._id !== productData._id
        )
      )
      .slice(0, 6);

  return (
    <>
      {loading && <p>Loading...</p>}
      {productData && (
        <>
          <div className="row">
            <div className="col-4">
              <img
                className="mx-4 img-fluid"
                src={productData.images[0]}
                alt={productData.title}
              />
              <div className="mx-4 d-flex flex-column gap-3">
                <div className="btn-group-vertical">
                  <AddWishlist product={productData} />
                  <AddCart product={productData} />
                </div>
              </div>
            </div>
            <div className="col-8">
              <h1>{productData.title}</h1>
              <p>{productData.rating}</p>
              <div className="d-flex align-items-baseline gap-2">
                <span className="fw-bold fs-1">
                  ${productData.discountedPrice}
                </span>
                <span className="fw-medium text-secondary fs-4 text-decoration-line-through">
                  ${productData.price}
                </span>
              </div>
              <p className="fw-bold fs-2 text-secondary">
                {productData.discount}% Off
              </p>
              <hr />
              <div className="row">
                <span className="col-2 text-center">
                  10 Days <br />
                  Returnable
                </span>
                <span className="col-2 text-center">
                  Pay on <br />
                  Delivery
                </span>
                <span className="col-2 text-center">
                  Free <br />
                  Delivery
                </span>
                <span className="col-2 text-center">
                  Secure <br />
                  Payment
                </span>
              </div>

              <hr />
              {/* Discription */}
              <div>
                <h4>Description</h4>
                <ul>
                  {productData.description.map((value) => (
                    <li key={productData.description.indexOf(value)}>
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <hr />

          {/* More Items  */}
          <div>
            <h3>Similar Products</h3>
            <div className="d-flex flex-row overflow-auto gap-5">
              {recommendedProducts.map((product) => (
                <div className="col-2" key={product._id}>
                  <div
                    className="card shadow mb-5 bg-body-tertiary"
                    style={{ minWidth: "200px" }}
                  >
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
                    <div className="btn-group-vertical">
                      <AddWishlist product={product} />
                      <AddCart product={product} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
