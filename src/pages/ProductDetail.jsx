import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import AddWishlist from "../components/AddWishlist";
import AddCart from "../components/AddCart";

export default function ProductDetail() {
  const { productId } = useParams();

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
      const quantity = 1;
      setProductData({ ...product, discountedPrice, quantity });
    }
  }, [data]);

  function updateQuantity(product, operator) {
    if (operator === "inc") {
      setProductData((prev) => ({ ...prev, quantity: product.quantity + 1 }));
    } else if (operator === "dec") {
      setProductData((prev) => ({ ...prev, quantity: product.quantity - 1 }));
    }
  }
  return (
    <>
      {loading && <p>Loading...</p>}
      {productData && (
        <div className="row">
          <div className="col-4">
            <img
              className="mx-4 img-fluid"
              src={productData.images[0]}
              alt={productData.title}
            />
            <div className="mx-4 d-flex flex-column gap-3">
              <AddWishlist product={productData}/>
              <AddCart product={productData}/>
            </div>
          </div>
          <div className="col-8">
            <h1>{productData.title}</h1>
            <p>{productData.rating}</p>
            {/* <h4 style={{ textDecoration: "line-through" }}>
              $ {productData.price}
            </h4> */}
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

            {/* Quantity */}
            <div className="d-flex align-items-center">
              <span className="fs-4 me-3">Quantity: </span>
              <button
                className="btn btn-light"
                onClick={() => updateQuantity(productData, "dec")}
                disabled={productData.quantity <= 1}
              >
                {" "}
                -{" "}
              </button>
              <span className="px-3">{productData.quantity}</span>
              <button
                className="btn btn-light"
                onClick={() => updateQuantity(productData, "inc")}
              >
                +
              </button>
            </div>
            <div></div>
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
                  <li key={productData.description.indexOf(value)}>{value}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
