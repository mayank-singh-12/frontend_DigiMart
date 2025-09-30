import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";

export default function ProductDetail() {
  const { productId } = useParams();

  const { data, loading, error } = useFetch(
    `https://backend-digi-mart.vercel.app/products/${productId}`
  );

  const [productData, setProductData] = useState();
  useEffect(() => setProductData(data.product), [data]);

  const discountedPrice =
    productData && Math.ceil((productData.price * productData.discount) / 100);

  //   const description = productData.description;
  return (
    <>
      {loading && <p>Loading...</p>}
      {productData && (
        <div>
          <img src={productData.images[0]} alt="" />
          <h1>{productData.title}</h1>
          <p>{productData.rating}</p>
          <h4 style={{ textDecoration: "line-through" }}>
            $ {productData.price}
          </h4>
          <h4>$ {discountedPrice}</h4>
          <p>{productData.discount}% Off</p>
          {/* Discription */}
          //TODO: ADD DESCRIPTION
          <div>
            <h4>Description</h4>
          </div>
        </div>
      )}
    </>
  );
}
