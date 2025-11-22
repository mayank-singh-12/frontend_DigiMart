import Header from "../components/Header";
import check from "../assets/check.png";
import { useNavigate } from "react-router-dom";
export default function OrderSuccess() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div
        className="container d-flex flex-column justify-content-center align-items-center text-center"
        style={{ height: "80vh" }}
      >
        <img
          src={check}
          alt="check.png"
          // style={{ width: "200px", marginTop: "200px" }}
          className="w-25"
        />
        <h1 className="mt-4">Order Placed Successfully!</h1>
        <button
          className="mt-4 btn btn-primary"
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>
      </div>
    </>
  );
}
